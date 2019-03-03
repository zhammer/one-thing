import React, { Fragment } from 'react';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './custom/styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './App.styles';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Navbar />
        <LoginPage />
      </Fragment>
    </ThemeProvider>
  )
}
