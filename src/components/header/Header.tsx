import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Todo, TodoStateInterface } from '../../todo-interface';
import { v4 as uuid_v4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../../graphql/mutations/todoMutations';
import { InsertUpdateTodoParams } from '../../graphql/params/insertUpdateTodoParams';

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
      info: info,
      editing: false
    };
    insertTodo({
      variables: {
        [InsertUpdateTodoParams.Id]: newTodo.id,
        [InsertUpdateTodoParams.Name]: newTodo.name,
        [InsertUpdateTodoParams.Info]: newTodo.info
      }
    });
    clearFields();
    setTodoList([...todoList, newTodo]);
    setShow(false);
  }

  return (
    <>
      <div style={{display: "flex", justifyContent: "space-between", margin: "10px 10px"}}>
        <h1>Todo List Client</h1>
        <Button variant="primary" onClick={handleShow}>Add Todo</Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="add">
            <label style={{margin: "0px 5px"}}>Name</label>
            <input value={name} onChange={onNameChange}/>
            <label style={{margin: "0px 5px"}}>Info</label>
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