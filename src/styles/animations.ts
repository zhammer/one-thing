import { keyframes } from '../custom/styled-components';

export const fadedrop = keyframes`
  from {
    transform: translate3d(0,-4px,0);
    opacity: 0;
  }
  to {
    transform: translateZ(0);
    opacity: 1;
  }
`;
