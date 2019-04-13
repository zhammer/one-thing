import React, { useState } from 'react';
import { Container } from './Confetti.styles';
import Particle from './Particle';
import { getRandomItem, range } from '../../util';

interface ConfettiProps {
  partyTime?: boolean;
}

/**
 * Component that rains confetti from the top of the window when partyTime
 * is set to true.
 * Based on https://codepen.io/ykadosh/pen/aaoZRB.
 */
export default function Confetti({ partyTime = false }: ConfettiProps) {
  const [count] = useState(() => Math.floor(window.innerWidth / 20));
  const [particleComponents] = useState(() =>
    range(count).map(() =>
      getRandomItem([Particle.Squiggle, Particle.Circular, Particle.Circular])
    )
  );

  if (!partyTime) return <></>;
  return (
    <Container data-class-name="confetti">
      {particleComponents.map((ParticleComponent, i) => (
        <ParticleComponent key={i} />
      ))}
    </Container>
  );
}
