import gql from 'graphql-tag';
import { InsertTodoParams } from '../params/insertTodoParams';

export const ADD_TODO = gql`
  mutation addTodo(
    $${InsertTodoParams.Id}: String!,
    $${InsertTodoParams.Name}: String!,
    $${InsertTodoParams.Info}: String
  ) {
    addTodo(todo: {
      id: $${InsertTodoParams.Id},
      name: $${InsertTodoParams.Name},
      info: $${InsertTodoParams.Info}
    }) {
      id
      name
      info
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