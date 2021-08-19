import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';

const httpLink = createHttpLink({ uri: 'https://ps-todo-app-server.herokuapp.com/' });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Authorization': process.env.REACT_APP_TOKEN
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
