import React, { useState, useEffect } from 'react';
import { Todo, TodoStateInterface } from '../../todo-interface';
import { useMutation, useSubscription } from '@apollo/client';
import { DELETE_TODO, SET_EDITING, UPDATE_TODO } from '../../graphql/mutations/todoMutations';
import { TODO_CHANGED } from '../../graphql/subscriptions/todoSubscriptions';
import Button from 'react-bootstrap/Button';
import { PencilSquare, Trash, Check, X } from 'react-bootstrap-icons';
import { useAuth0 } from "@auth0/auth0-react";

import './TodoList.css';

const TodoList: React.FC<TodoStateInterface> = ({ todoList, setTodoList }) => {
  const { data } = useSubscription(TODO_CHANGED);
  const [deleteMutation] = useMutation(DELETE_TODO);
  const [setEditingMutation] = useMutation(SET_EDITING);
  const [updateTodoMutation] = useMutation(UPDATE_TODO);
  const { isAuthenticated } = useAuth0();
  const [authenticated, setAuthenticated] = useState(!window.location.origin.includes('localhost') ? true : isAuthenticated);

  // Enable multiple clients because subscription will update client if mutation did not manually update local state
  useEffect(() => {
    if (!data) return;
    if (data.todoChanged.type === 'ADD') {
      let addedTodo: Todo = data.todoChanged.data;
      if (todoList.filter(todo => todo.id === addedTodo.id).length === 0) setTodoList([...todoList, addedTodo]);
    }
    else if (data.todoChanged.type === 'UPDATE') {
      let updatedTodo: Todo = data.todoChanged.data;
      let checkTodo = todoList.filter(todo => todo.id === updatedTodo.id)[0];
      if (updatedTodo.name !== checkTodo.name || updatedTodo.info !== checkTodo.info) {
        setTodoList(todoList.map(todo => todo.id === updatedTodo.id ? { id: updatedTodo.id, name: updatedTodo.name, info: updatedTodo.info, editing: false, visible: true } : todo));
      }
    }
    else if (data.todoChanged.type === 'DELETE') {
      let deletedTodo: Todo = data.todoChanged.data;
      if (todoList.filter(todo => todo.id === deletedTodo.id).length === 1) setTodoList(todoList.filter(todo => todo.id !== deletedTodo.id));
    }
  }, [data, todoList, setTodoList]);

  useEffect(() => {
    setAuthenticated(!window.location.origin.includes('localhost') ? true : isAuthenticated)
  }, [isAuthenticated]);


  // Find out whether a todo is previously being edited
  const getPreviouslyEditingTodo = () => {
    return todoList.length > 0 ? todoList.reduce((prev, curr) => {
      return prev.editing ? prev : curr.editing ? curr : { id: '', name: '', info: '', editing: false, visible: true };
    }) : { id: "", name: "", info: "", editing: false, visible: true };
  }
  const [editingTodo, setEditingTodo] = useState(getPreviouslyEditingTodo());
  const [editing, setEditing] = useState(false);

  const deleteTodo = (id: string) => {
    deleteMutation({ variables: { id: id }});
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  const editTodo = (id: string, editing: boolean) => {
    setEditing(editing);
    setEditingMutation({ variables: { id: id, editing: editing }});
    // Destructure object because we cannot directly change values in the state
    setTodoList(todoList.map(todo => {
      if (todo.id === id) {
        let newTodo = { ...todo, editing: editing };
        setEditingTodo(newTodo);
        return newTodo;
      }
      return todo;
    }));
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditingTodo({ ...editingTodo, name: event.target.value })
  const onInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditingTodo({ ...editingTodo, info: event.target.value })

  const updateTodo = () => {
    updateTodoMutation({ variables: { id: editingTodo.id, name: editingTodo.name, info: editingTodo.info }});
    setTodoList(todoList.map(todo => todo.id === editingTodo.id ? { id: editingTodo.id, name: editingTodo.name, info: editingTodo.info, editing: false, visible: true } : todo));
    setEditing(false);
  }

  return (
    <>
      <div className="todoList header">
        <div>Name</div>
        <div>Info</div>
      </div>
      {todoList.map((elem: Todo) => 
        elem.visible ?
        !elem.editing ? (
          <div key={elem.id}>
            <hr/>
            <div className="todoList">
              <div>{elem.name}</div>
              <div>{elem.info}</div>
              <Button variant="secondary" onClick={() => editTodo(elem.id, true)} disabled={editing || !authenticated}><PencilSquare/></Button>
              <Button variant="secondary" onClick={() => deleteTodo(elem.id)} disabled={!authenticated}><Trash/></Button>
            </div>
          </div>
        ) : 
        (
          <div key={elem.id}>
            <hr/>
            <div className="todoList">
              <input value={editingTodo.name} onChange={onNameChange}></input>
              <input value={editingTodo.info} onChange={onInfoChange}></input>
              <Button variant="secondary" onClick={() => editTodo(elem.id, false)}><X/></Button>
              <Button variant="primary" onClick={updateTodo}><Check/></Button>
            </div>
          </div>
        )
        : <React.Fragment key={elem.id}></React.Fragment>
      )}
    </>
  );
}

export default TodoList;