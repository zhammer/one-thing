import React from 'react';
import useConfettiParticleStyles from './useConfettiParticleStyles';

function CircularParticle() {
  const confettiParticleStyles = useConfettiParticleStyles.div({
    sizeRange: [5, 10],
    rotationRange: [0, 45],
    leftRange: [-250, 250],
    topOffset: window.innerHeight
  });

  return <div style={confettiParticleStyles} />;
}

function SquiggleParticle() {
  const confettiParticleStyles = useConfettiParticleStyles.svg({
    sizeRange: [15, 45],
    rotationRange: [-15, 15],
    leftRange: [-250, 250],
    topOffset: window.innerHeight
  });
  return (
    <svg viewBox="0 0 512 512" style={confettiParticleStyles}>
      <path d="M428.127 0l-12.716 10.062L428.129.002c8.785 11.101 19.716 24.917 19.716 51.051s-10.932 39.951-19.716 51.053c-7.382 9.331-12.716 16.072-12.716 30.927 0 14.854 5.334 21.594 12.716 30.925 8.784 11.101 19.716 24.917 19.716 51.05 0 26.135-10.931 39.949-19.715 51.051-7.383 9.331-12.717 16.072-12.717 30.927s5.332 21.593 12.711 30.919l-25.435 20.124c-8.781-11.097-19.708-24.909-19.708-51.042 0-26.135 10.931-39.949 19.715-51.051 7.383-9.331 12.717-16.072 12.717-30.927s-5.335-21.595-12.717-30.926c-8.784-11.101-19.715-24.916-19.715-51.049s10.931-39.95 19.715-51.051c7.383-9.331 12.717-16.072 12.717-30.928 0-14.855-5.335-21.596-12.718-30.927L428.127 0z" />
    </svg>
  );
}

export default {
  Squiggle: SquiggleParticle,
  Circular: CircularParticle
};
