import { keyframes } from 'styled-components';

export const showFromLeft = keyframes`
  from {
    transform: translateX(-2.5rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const showFromTop = keyframes`
  from {
    transform: translateY(-1rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const heartBeat = keyframes`
  0% {
    transform: scale(1.25);
  }
  20% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.25);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
`;
