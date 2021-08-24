import React, { useState } from 'react';
import { Todo, TodoStateInterface } from '../../todo-interface';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, SET_EDITING, UPDATE_TODO } from '../../graphql/mutations/todoMutations';
import Button from 'react-bootstrap/Button';
import { PencilSquare, Trash, Check, X } from 'react-bootstrap-icons';

import './TodoList.css';

const TodoList: React.FC<TodoStateInterface> = ({ todoList, setTodoList }) => {
  const [deleteMutation] = useMutation(DELETE_TODO);
  const [setEditingMutation] = useMutation(SET_EDITING);
  const [updateTodoMutation] = useMutation(UPDATE_TODO);
  const getPreviouslyEditingTodo = () => {
    return todoList.length > 0 ? todoList.reduce((prev, curr) => {
      // Previously found an updating todo, keep previous
      if (prev.editing) return prev;
      // Current todo is updating, update to current
      if (curr.editing) return curr;
      // Updating todo not found, set an empty todo
      return { id: "", name: "", info: "", editing: false };
    }) : { id: "", name: "", info: "", editing: false };
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
    setTodoList(todoList.map(todo => todo.id === editingTodo.id ? { id: editingTodo.id, name: editingTodo.name, info: editingTodo.info, editing: false } : todo));
    setEditing(false);
  }

  return (
    <>
      <div className="todoList header">
        <div>Name</div>
        <div>Info</div>
      </div>
      {todoList.map((elem: Todo) => 
        !elem.editing ? (
          <>
            <hr/>
            <div className="todoList" key={elem.id}>
              <div>{elem.name}</div>
              <div>{elem.info}</div>
              <Button variant="secondary" onClick={() => editTodo(elem.id, true)} disabled={editing}><PencilSquare/></Button>
              <Button variant="secondary" onClick={() => deleteTodo(elem.id)}><Trash/></Button>
            </div>
          </>
        ) : 
        (
          <>
            <hr/>
            <div className="todoList" key={elem.id}>
              <input value={editingTodo.name} onChange={onNameChange}></input>
              <input value={editingTodo.info} onChange={onInfoChange}></input>
              <Button variant="secondary" onClick={() => editTodo(elem.id, false)}><X/></Button>
              <Button variant="primary" onClick={updateTodo}><Check/></Button>
            </div>
          </>
        )
      )}
    </>
  );
}

export default TodoList;