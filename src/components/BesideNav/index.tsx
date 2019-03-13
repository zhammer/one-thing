import styled from '../../custom/styled-components';
import { mobileBreakpoint, navbarWidth } from '../../styles/variables';

const BesideNav = styled.div`
  @media screen and (min-width: ${mobileBreakpoint}) {
    padding: 0 0 0 ${navbarWidth};
  }
`;

export default BesideNav;
