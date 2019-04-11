import styled from '../../custom/styled-components';
import {
  mobileBreakpoint,
  navbarWidth,
  mobileNavbarHeight
} from '../../styles/variables';

const BesideNav = styled.div`
  padding: 0 0 ${mobileNavbarHeight} 0;

  @media screen and (min-width: ${mobileBreakpoint}) {
    padding: 0 0 0 ${navbarWidth};
  }
`;

export default BesideNav;
