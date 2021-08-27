import ReactDOM from 'react-dom';
import './index.css';
import { split, ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import { getMainDefinition } from '@apollo/client/utilities';
import { Auth0Provider } from '@auth0/auth0-react';
import { HashRouter as Router, Route } from 'react-router-dom';

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

// TODO : there is currently an issue with GitHub Pages and setting up Auth0
let origin = window.location.origin.includes('localhost') ? 'http://localhost:3000/callback' : 'http://narnian12.github.io/todo-app-client/#/callback';

ReactDOM.render(
  <Auth0Provider
    domain='dev-pcwqkxo5.us.auth0.com'
    clientId='A4YoJdfrCasvshDL06K9AfxpIpVif8DC'
    redirectUri={`${origin}`}>
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/callback">
          <App />
        </Route>
      </Router>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);
