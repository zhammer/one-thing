import React from "react";
import "./Thing.scss";
import Checkmark from "../Checkmark";

interface ThingProps {
  text: string;
  complete?: boolean;
}

export default function Thing({ text, complete = false }: ThingProps) {
  return (
    <div className={`thing thing--${complete ? "complete" : "noncomplete"}`}>
      <div className="thing__text">{text}</div>
      {complete && <Checkmark className='thing__checkmark' />}
    </div>
  );
}
