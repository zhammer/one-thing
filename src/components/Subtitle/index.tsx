import React from 'react';
import './Subtitle.scss';

interface SubtitleProps {
  children: React.ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  return (
    <div className='subtitle'>
      <h2>{children}</h2>
    </div>
  )
}
