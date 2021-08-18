import React from 'react';
import { Todo, TodoStateInterface } from '../../todo-interface';
import { useMutation } from '@apollo/client';
import { DELETE_TODO } from '../../graphql/mutations/todoMutations';
import Button from 'react-bootstrap/Button';

import './TodoList.css';

const TodoList: React.FC<TodoStateInterface> = ({ todoList, setTodoList }) => {
  const [deleteMutation] = useMutation(DELETE_TODO);

  const deleteTodo = (id: string) => {
    deleteMutation({ variables: { id: id }});
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    <>
      <div className="todoList header">
        <div>Name</div>
        <div>Info</div>
      </div>
      {todoList.map((elem: Todo) => {
        return (
          <div className="todoList" key={elem.id}>
            <div>{elem.name}</div>
            <div>{elem.info}</div>
            <Button variant="secondary" onClick={() => deleteTodo(elem.id)}>x</Button>
          </div>
        )
      })}
    </>
  );
}

export default TodoList;