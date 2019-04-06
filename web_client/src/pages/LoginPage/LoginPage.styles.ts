import styled from '../../custom/styled-components';
import { mobileBreakpoint } from '../../styles/variables';
import { fadedrop } from '../../styles/animations';

export const ExampleContainer = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: ${mobileBreakpoint}) {
    margin-top: 3em;
    margin-bottom: 3em;
  }

  & > * {
    animation: 1s ${fadedrop} ease both;
  }

  ${[0, 1, 2, 3, 4, 5].map(
    i => `
    & > *:nth-child(${i}) {
      animation-delay: ${(i - 1) * 3 + 0.3}s;
    }
  `
  )}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
