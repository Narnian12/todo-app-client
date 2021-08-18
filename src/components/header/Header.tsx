import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Todo, TodoStateInterface } from '../../todo-interface';
import { v4 as uuid_v4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../../graphql/mutations/todoMutations';
import { InsertTodoParams } from '../../graphql/params/insertTodoParams';

import './Header.css';

const Header: React.FC<TodoStateInterface> = ({ todoList, setTodoList }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [insertTodo] = useMutation(ADD_TODO);

  const clearFields = () => {
    setName('');
    setInfo('');
  }

  const handleClose = () => {
    setShow(false);
    clearFields();
  }
  const handleShow = () => setShow(true)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  const onInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => setInfo(event.target.value)
  
  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newTodo: Todo = {
      id: uuid_v4(),
      name: name,
      info: info
    };
    insertTodo({
      variables: {
        [InsertTodoParams.Id]: newTodo.id,
        [InsertTodoParams.Name]: newTodo.name,
        [InsertTodoParams.Info]: newTodo.info
      }
    });
    clearFields();
    setTodoList([...todoList, newTodo]);
    setShow(false);
  }

  return (
    <>
      <h1>Todo List Client</h1>
      <Button variant="primary" onClick={handleShow}>Add Todo</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="add">
            <label>Name</label>
            <input value={name} onChange={onNameChange}/>
            <label>Info</label>
            <input value={info} onChange={onInfoChange}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addTodo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default Header;