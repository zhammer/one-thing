import React from 'react';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from './custom/styled-components';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>
  )
}
