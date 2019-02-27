import React from 'react';
import './Button.scss';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type: 'primary' | 'secondary';
}

export default function Button({ children, type, ...rest }: ButtonProps) {
  return (
    <button className={`btn btn--${type}`} {...rest} >
      {children}
    </button>
  )
}
