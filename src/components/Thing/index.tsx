import React from "react";
import "./Thing.scss";

interface ThingProps {
  text: string;
  complete?: boolean;
}

export default function Thing({ text, complete = false }: ThingProps) {
  return (
    <div className={`thing thing--${complete ? "complete" : "noncomplete"}`}>
      <div className="thing__text">{text}</div>
    </div>
  );
}
