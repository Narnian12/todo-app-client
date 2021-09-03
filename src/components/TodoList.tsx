import React, { useState, useEffect } from 'react';
import { Todo, TodoStateInterface } from '../todo-interface';
import { useMutation, useSubscription } from '@apollo/client';
import { DELETE_TODO, SET_EDITING, SET_COMPLETE, UPDATE_TODO } from '../graphql/mutations/todoMutations';
import { TODO_CHANGED } from '../graphql/subscriptions/todoSubscriptions';
import Button from 'react-bootstrap/Button';
import { PencilSquare, Trash, Check, X } from 'react-bootstrap-icons';

import styled from 'styled-components';

const TodoListStyle = styled.div`
  border: 0.5px solid lightblue;
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoListCheckbox = styled.input`
  margin: 5px;
`;

type TodoListItemStyle = {
  complete: boolean
};

const TodoListItem = styled(TodoListStyle)`
  border-style: none;
  text-align: start;
  width: 90%;
  margin: 0px 0px 0px 9px;
  font-size: 14px;
  text-decoration: ${(props: TodoListItemStyle) => props.complete ? "line-through" : "none"};
`;

const TodoListInput = styled.input`
  text-align: start;
  width: 90%;
  margin: 5px;
  font-size: 14px;
`;

const TodoListButton = styled(Button)`
  margin: 5px;
`

const TodoList: React.FC<TodoStateInterface> = ({ todoList, setTodoList }) => {
  const { data } = useSubscription(TODO_CHANGED);
  const [deleteMutation] = useMutation(DELETE_TODO);
  const [setEditingMutation] = useMutation(SET_EDITING);
  const [setCompleteMutation] = useMutation(SET_COMPLETE);
  const [updateTodoMutation] = useMutation(UPDATE_TODO);

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
      if (updatedTodo.name !== checkTodo.name) {
        setTodoList(todoList.map(todo => todo.id === updatedTodo.id ? { id: updatedTodo.id, name: updatedTodo.name, editing: false, visible: true, complete: false } : todo));
      }
    }
    else if (data.todoChanged.type === 'DELETE') {
      let deletedTodo: Todo = data.todoChanged.data;
      if (todoList.filter(todo => todo.id === deletedTodo.id).length === 1) setTodoList(todoList.filter(todo => todo.id !== deletedTodo.id));
    }
    else if (data.todoChanged.type === 'COMPLETE') {
      let completeChangedTodo: Todo = data.todoChanged.data;
      if (todoList.find((todo: Todo) => todo.id === completeChangedTodo.id)?.complete !== completeChangedTodo.complete) {
        setTodoList(todoList.map(todo => todo.id === completeChangedTodo.id ? { ...todo, complete: !todo.complete } : todo ));
      }
    }
    data.todoChanged.type = 'NONE';
  }, [data, todoList, setTodoList]);

  // Find out whether a todo is previously being edited
  const getPreviouslyEditingTodo = () => {
    return todoList.length > 0 ? todoList.reduce((prev, curr) => {
      return prev.editing ? prev : curr.editing ? curr : { id: '', name: '', info: '', editing: false, visible: true, complete: false };
    }) : { id: "", name: "", info: "", editing: false, visible: true, complete: false };
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

  const updateTodo = () => {
    updateTodoMutation({ variables: { id: editingTodo.id, name: editingTodo.name }});
    setTodoList(todoList.map(todo => todo.id === editingTodo.id ? { id: editingTodo.id, name: editingTodo.name, editing: false, visible: true, complete: false } : todo));
    setEditing(false);
  }

  const changeComplete = (id: string) => {
    let changedTodo = todoList.find((elem: Todo) => elem.id === id);
    setCompleteMutation({ variables: { id: id, complete: !changedTodo?.complete}});
    setTodoList(todoList.map(todo => todo.id === changedTodo?.id ? { ...changedTodo, complete: !changedTodo?.complete } : todo));
  }

  return (
    <>
      {todoList.map((elem: Todo) => 
        !elem.editing ? (
          <React.Fragment key={elem.id}>
            <TodoListStyle>
              <TodoListCheckbox type="checkbox" checked={elem.complete} onChange={() => changeComplete(elem.id)}/>
              <TodoListItem complete={elem.complete}>{elem.name}</TodoListItem>
              <TodoListButton variant="secondary" onClick={() => editTodo(elem.id, true)} disabled={editing || elem.complete}><PencilSquare/></TodoListButton>
              <TodoListButton variant="secondary" onClick={() => deleteTodo(elem.id)}><Trash/></TodoListButton>
            </TodoListStyle>
          </React.Fragment>
        ) : 
        (
          <React.Fragment key={elem.id}>
            <TodoListStyle>
              <TodoListInput value={editingTodo.name} onChange={onNameChange}></TodoListInput>
              <TodoListButton variant="secondary" onClick={() => editTodo(elem.id, false)}><X/></TodoListButton>
              <TodoListButton variant="primary" onClick={updateTodo}><Check/></TodoListButton>
            </TodoListStyle>
          </React.Fragment>
        )
      )}
    </>
  );
}

export default TodoList;