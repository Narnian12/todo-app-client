import gql from 'graphql-tag';

export const GET_TODO_LIST = gql`
  query GetTodoList {
    getTodoList {
      id
      name
      info
    }
  }
`;
