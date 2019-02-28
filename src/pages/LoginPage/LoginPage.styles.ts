import styled, { keyframes } from "styled-components";

const fadedrop = keyframes`
  from {
    transform: translate3d(0,-4px,0);
    opacity: 0;
  }
  to {
    transform: translateZ(0);
    opacity: 1;
  }
`;

export const ExampleContainer = styled.div`
  margin-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 3em;

  & > * {
    animation: 1s ${fadedrop} ease both;
  }

  ${[0,1,2,3,4,5].map(i => `
    & > *:nth-child(${i}) {
      animation-delay: ${((i - 1) * 3) + .3}s;
    }
  `)}
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const SeatGeekBlue = styled.span`
  color: var(--seatgeek-blue);
`
