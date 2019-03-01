import React, { Fragment } from 'react';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './custom/styled-components';
import theme from './theme';
import { GlobalStyle } from './App.styles';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <LoginPage />
      </Fragment>
    </ThemeProvider>
  )
}
