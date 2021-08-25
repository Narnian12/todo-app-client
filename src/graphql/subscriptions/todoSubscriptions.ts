import gql from 'graphql-tag';

export const TODO_CHANGED = gql`
  subscription TodoChanged {
    todoChanged {
      type
      data {
        id
        name
        info
        editing
      }
    }
  }
`;