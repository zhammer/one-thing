import styled from "../../custom/styled-components";
import Icon from "../Icon";
import { mobileBreakpoint } from "../../styles/variables";

interface ContainerProps {
  complete: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
  background: white;
  padding: .75em 1em;
  border: 2px solid ${props => props.complete ? props.theme.seatgeekBlue : props.theme.primary};
  border-radius: .25em;
  width: 80%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.075);

  @media screen and (min-width: ${mobileBreakpoint}) {
    font-size: 1.25rem;
  }

  & + & {
    margin-top: .75em;
    @media screen and (min-width: ${mobileBreakpoint}) {
      margin-top: 1em;
    }
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Contact = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.secondary};
  font-size: .8rem;
  margin-top: .75em;
  transition: color .5s ease;

  &:hover {
    color: ${props => props.theme.seatgeekBlue};
  }

  & svg {
    fill: ${props => props.theme.secondary};
    height: 1em;
    margin-left: .5em;
    transition: fill .5s ease;
  }

  &:hover svg {
    fill: ${props => props.theme.seatgeekBlue};
  }
`;

export const CheckmarkBadge = styled(Icon.Checkmark)`
  height: 1.5em;
  width: 1.5em;
  fill: ${props => props.theme.seatgeekBlue};
  align-self: center;
  flex-shrink: 0;
`;
