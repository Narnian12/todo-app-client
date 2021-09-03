import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODO_LIST } from './graphql/queries/todoQueries';
import { Todo } from './todo-interface';

import Header from './components/Header';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const TodoWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
`

const App: React.FC = () => {
  const { loading, error, data, } = useQuery(GET_TODO_LIST);
  let typedTodoList: Todo[] = data ? data.getTodoList : null;
  const [todoList, setTodoList] = useState(typedTodoList);
  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error);
    return <p>Error</p>
  }
  // If console log, notice the first iteration returns data as null, so do a single setState
  if (data && !todoList) {
      setTodoList(typedTodoList.map(todo => { return { ...todo, visible: true } }));
  }

  return (
    <TodoWrapper>
      <Header todoList={todoList} setTodoList={setTodoList}/>
      <TodoList todoList={todoList} setTodoList={setTodoList}/>
    </TodoWrapper>
  );
}

export default App;
