import React from 'react';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './custom/styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './App.styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import AuthenticatedApp from './AuthenticatedApp';
import { client } from './apollo';
import CallbackPage from './pages/CallbackPage';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Router>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/callback" component={CallbackPage} />
              <Route path="/" component={AuthenticatedApp} />
            </Switch>
          </Router>
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}
