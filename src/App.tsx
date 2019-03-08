import React from "react";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "./custom/styled-components";
import theme from "./styles/theme";
import { GlobalStyle } from "./App.styles";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route path='/' component={AuthenticatedApp} />
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
}
