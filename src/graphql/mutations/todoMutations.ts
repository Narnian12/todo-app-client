import gql from 'graphql-tag';
import { InsertUpdateTodoParams } from '../params/insertUpdateTodoParams';

export const ADD_TODO = gql`
  mutation addTodo(
    $${InsertUpdateTodoParams.Id}: String!,
    $${InsertUpdateTodoParams.Name}: String!,
    $${InsertUpdateTodoParams.Info}: String
  ) {
    addTodo(todo: {
      id: $${InsertUpdateTodoParams.Id},
      name: $${InsertUpdateTodoParams.Name},
      info: $${InsertUpdateTodoParams.Info}
    }) {
      id
      name
      info
      editing
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const SET_EDITING = gql`
  mutation setEditing($id: String!, $editing: Boolean!) {
    setEditing(id: $id, editing: $editing) {
      id
      name
      info
      editing
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $${InsertUpdateTodoParams.Id}: String!,
    $${InsertUpdateTodoParams.Name}: String!,
    $${InsertUpdateTodoParams.Info}: String
  ) {
    updateTodo(todo: {
      id: $${InsertUpdateTodoParams.Id},
      name: $${InsertUpdateTodoParams.Name},
      info: $${InsertUpdateTodoParams.Info}
    }) {
      id
      name
      info
      editing
    }
  }
`;