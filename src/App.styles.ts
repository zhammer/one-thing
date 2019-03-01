import { createGlobalStyle } from "./custom/styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;

    margin: 0;
    padding: 0;

    font-family: "Raleway", sans-serif;
    font-size: 12px;
    font-weight: 200;

    background-color: ${props => props.theme.background};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${props => props.theme.highlight};
  }
`;
