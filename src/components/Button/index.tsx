import styled from '../../custom/styled-components';

const Base = styled.button`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.075);
  transition: box-shadow 0.15s;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.25rem;
  padding: 0.5em 2em;
  border-radius: 0.25em;

  &:hover:not([disabled]) {
    box-shadow: 0 12px 22px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &:disabled {
    background: ${props => props.theme.secondaryLight};
  }
`;

const Primary = styled(Base)`
  color: white;
  background: ${props => props.theme.seatgeekBlue};
`;

const Danger = styled(Base)`
  color: white;
  background: ${props => props.theme.danger};
`;

export default {
  Danger,
  Primary
};
