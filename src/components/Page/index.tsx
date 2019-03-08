import styled from '../../custom/styled-components';
import { mobileBreakpoint, navbarWidth } from '../../styles/variables';
import { keyframes } from 'styled-components';

const fadein = keyframes`
  from { opacity: 0 }
  to   { opacity: 1 }
`

const Base = styled.div`
  width: 90%;
  margin: 0 auto;
  animation: ${fadein} .25s linear both;
  margin-bottom: 2em;

  @media screen and (min-width: ${mobileBreakpoint}) {
    width: 55%;
  }
`;

const WithoutNav = styled(Base)``;
const BesideNav = styled(Base)`
  @media screen and (min-width: ${mobileBreakpoint}) {
    padding: 0 0 0 ${navbarWidth};
  }
`;

export default {
  BesideNav,
  WithoutNav,
}
