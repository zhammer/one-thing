import styled from '../../custom/styled-components';
import { mobileBreakpoint, navbarWidth } from '../../styles/variables';

const Base = styled.div`
  width: 55%;
  margin: 0 auto;
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
