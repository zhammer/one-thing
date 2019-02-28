import React from "react";
import Email from "../Email";
import { Container, Body, Contact, CheckmarkBadge } from "./Thing.styles";

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
    <Container complete={complete}>
      <Body>
        <div>{text}</div>
        <Contact>
          {makePersonName(person)} <Email />
        </Contact>
      </Body>
      {complete && <CheckmarkBadge />}
    </Container>
  );
}

function makePersonName(person: Person) {
  return person.firstName + ' ' + person.lastName.charAt(0);
}
