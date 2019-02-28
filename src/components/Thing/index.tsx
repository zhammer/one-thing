import React from "react";
import "./Thing.scss";
import Checkmark from "../Checkmark";
import Email from "../Email";

interface Person {
  firstName: string;
  lastName: string;
}

interface ThingProps {
  text: string;
  complete?: boolean;
  person: Person;
}

export default function Thing({ text, complete = false, person }: ThingProps) {
  return (
    <div className={`thing thing--${complete ? "complete" : "noncomplete"}`}>
      <div className="thing__body">
        <div className="thing__text">{text}</div>
        <div className="thing__contact">
          {makePersonName(person)} <Email className='email-icon' />
        </div>
      </div>
      {complete && <Checkmark className="thing__checkmark" />}
    </div>
  );
}

function makePersonName(person: Person) {
  return person.firstName + ' ' + person.lastName.charAt(0);
}
