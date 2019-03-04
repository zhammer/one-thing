import styled from "../../custom/styled-components";
import { mobileBreakpoint } from "../../styles/variables";

const Title = styled.h1`
  color: ${props => props.theme.primary};
  font-family: 'Dancing Script', cursive;
  text-align: center;
  font-size: 4rem;
  margin: 0;
  padding: .6em 0 .1em;

  @media screen and (min-width: ${mobileBreakpoint}) {
    padding: .75em 0 .25em;
    font-size: 6rem;
  }
`;

export default Title;
