import styled from "../../custom/styled-components";
import { navbarWidth } from "../../styles/variables";

export const Container = styled.div`
  width: ${navbarWidth};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
  width: ${navbarWidth};
  height: auto;
  padding: 2em 2em;

  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  margin-top: 0.5em;
  letter-spacing: 0.1rem;
`;

const NavItemBase = styled.div`
  color: ${props => props.theme.secondaryLight};
  fill: ${props => props.theme.secondaryLight};
  text-align: center;
  padding: 1rem 0.25rem;
  cursor: pointer;
  transition: color 0.25s, fill 0.25s;

  &:hover {
    color: ${props => props.theme.secondary};
    fill: ${props => props.theme.secondary};
  }
`;

const NavItemLogo = styled(NavItemBase)`
  font-family: "Dancing Script", cursive;
  color: ${props => props.theme.seatgeekBlue};
  font-size: 1.5rem;
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
`;

export const NavItem = {
  Logo: NavItemLogo,
  Icon: NavItemIcon
};
