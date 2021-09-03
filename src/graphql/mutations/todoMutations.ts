import gql from 'graphql-tag';
import { InsertUpdateTodoParams } from '../params/insertUpdateTodoParams';

export const ADD_TODO = gql`
  mutation addTodo(
    $${InsertUpdateTodoParams.Id}: String!,
    $${InsertUpdateTodoParams.Name}: String!
  ) {
    addTodo(todo: {
      id: $${InsertUpdateTodoParams.Id},
      name: $${InsertUpdateTodoParams.Name}
    }) {
      id
      name
      editing
      complete
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
      editing
      complete
    }
  }
`;

export const SET_COMPLETE = gql`
  mutation setComplete($id: String!, $complete: Boolean!) {
    setComplete(id: $id, complete: $complete) {
      id
      name
      editing
      complete
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $${InsertUpdateTodoParams.Id}: String!,
    $${InsertUpdateTodoParams.Name}: String!
  ) {
    updateTodo(todo: {
      id: $${InsertUpdateTodoParams.Id},
      name: $${InsertUpdateTodoParams.Name}
    }) {
      id
      name
      editing
      complete
    }
  }
`;