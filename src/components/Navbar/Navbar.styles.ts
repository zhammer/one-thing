import styled from "../../custom/styled-components";
import { navbarWidth, mobileBreakpoint, mobileNavbarHeight } from "../../styles/variables";

export const Container = styled.div`
  position: fixed;
  display: flex;
  z-index: 101;

  height: ${mobileNavbarHeight};
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-around;
  align-items: center;
  padding: 0 1em;
  box-shadow: 0 -2px 5px rgba(0,0,0,.05);

  @media screen and (min-width: ${mobileBreakpoint}) {
    width: ${navbarWidth};
    padding: 2em 2em;
    flex-direction: column;
    justify-content: normal;
    height: auto;
    width: ${navbarWidth};
    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
  }
`;

export const Label = styled.div`
  @media screen and (min-width: ${mobileBreakpoint}) {
    margin-top: 0.5em;
  }

  letter-spacing: 0.1rem;
`;

const NavItemBase = styled.div`
  color: ${props => props.theme.secondaryLight};
  fill: ${props => props.theme.secondaryLight};
  text-align: center;
  padding: 1rem 0.25rem;
  cursor: pointer;
  transition: color 0.25s, fill 0.25s;
  height: 70%;

  &:hover {
    color: ${props => props.theme.secondary};
    fill: ${props => props.theme.secondary};
  }

  @media screen and (min-width: ${mobileBreakpoint}) {
    height: initial;
  }
`;

const NavItemLogo = styled(NavItemBase)`
  font-family: "Dancing Script", cursive;
  color: ${props => props.theme.seatgeekBlue};
  font-size: 1.5rem;

  display: none;
  @media screen and (min-width: ${mobileBreakpoint}) {
    display: block;
  }
`;

interface IsActiveProps {
  isActive?: boolean;
}

const NavItemIcon = styled(NavItemBase)<IsActiveProps>`
  color: ${props => props.isActive ? props.theme.secondary : props.theme.secondaryLight};
  fill: ${props => props.isActive ? props.theme.secondary : props.theme.secondaryLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > svg {
    width: 60%;
  }

  font-weight: bold;
  @media screen and (min-width: ${mobileBreakpoint}) {
    font-weight: inherit;
  }
`;

export const NavItem = {
  Logo: NavItemLogo,
  Icon: NavItemIcon
};
