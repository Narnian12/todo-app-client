import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Todo, TodoStateInterface } from '../todo-interface';
import { v4 as uuid_v4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '../graphql/mutations/todoMutations';
import { InsertUpdateTodoParams } from '../graphql/params/insertUpdateTodoParams';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightblue;
  padding: 5px;
`

const HeaderTitle = styled.h1`
  font-size: 24px;
  margin: 0px;
`

const FormStyle = styled.form`
  display: flex;
  align-items: center;
`

const LabelStyle = styled.label`
  width: 15%;
  margin: 5px;
`

const InputStyle = styled.input`
  width: 100%;
`

const Header: React.FC<TodoStateInterface> = ({ todoList, setTodoList }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [insertTodo] = useMutation(ADD_TODO);

  const clearFields = () => setName('')

  const handleClose = () => {
    setShow(false);
    clearFields();
  }
  const handleShow = () => setShow(true)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  
  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newTodo: Todo = {
      id: uuid_v4(),
      name: name,
      editing: false,
      visible: true,
      complete: false
    };
    insertTodo({
      variables: {
        [InsertUpdateTodoParams.Id]: newTodo.id,
        [InsertUpdateTodoParams.Name]: newTodo.name
      }
    });
    clearFields();
    setTodoList([...todoList, newTodo]);
    setShow(false);
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>Todo List</HeaderTitle>
        <Button variant="primary" onClick={handleShow}>Add Todo</Button>
      </HeaderWrapper>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormStyle onSubmit={addTodo}>
            <LabelStyle>Name</LabelStyle>
            <InputStyle value={name} onChange={onNameChange}/>
          </FormStyle>
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