import ReactDOM from 'react-dom';
import './index.css';
import { split, ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import { getMainDefinition } from '@apollo/client/utilities';

// const httpLink = createHttpLink({ uri: 'https://ps-todo-app-server.herokuapp.com/' });
const httpLink = createHttpLink({ uri: 'https://todo-app-server-expanded.herokuapp.com/graphql' });
const wsLink = new WebSocketLink({
  uri: 'wss://todo-app-server-expanded.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Authorization': process.env.REACT_APP_TOKEN
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
