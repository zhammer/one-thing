import styled from '../../custom/styled-components';
import { fadedrop } from '../../styles/animations';

export const ThingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    animation: 1.3s ${fadedrop} ease both;
  }

  ${Array.from(Array(100).keys()).map(
    i => `
        & > *:nth-child(${i}) {
          animation-delay: ${(i - 1) * 0.1}s;
        }
    `
  )}
`;
