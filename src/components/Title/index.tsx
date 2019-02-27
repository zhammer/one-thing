import React from 'react';
import './Title.scss';

interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <div className='title'>
      <h1>{children}</h1>
    </div>
  )
}
