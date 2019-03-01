import React from "react";
import Email from "../Email";
import { Container, Body, Contact, CheckmarkBadge } from "./Thing.styles";
import { ThingInterface, PersonInterface } from "../../types";

interface ThingProps {
  thing: ThingInterface;
}

export default function Thing({ thing }: ThingProps) {
  return (
    <Container complete={thing.complete}>
      <Body>
        <div>{thing.description}</div>
        <Contact>
          {makePersonName(thing.person)} <Email />
        </Contact>
      </Body>
      {thing.complete && <CheckmarkBadge />}
    </Container>
  );
}

function makePersonName(person: PersonInterface) {
  return person.firstName + ' ' + person.lastName.charAt(0);
}
