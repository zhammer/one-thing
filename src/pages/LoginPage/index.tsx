import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Thing from "../../components/Thing";
import Button from "../../components/Button";
import { ExampleContainer, ButtonContainer, SeatGeekBlue } from "./LoginPage.styles";

export default function LoginPage() {
  return (
    <Page>
      <Title>One Thing</Title>
      <Subtitle>
        One thing you want to do this week, together with others at{" "}
        <SeatGeekBlue>SeatGeek</SeatGeekBlue>.
      </Subtitle>
      <ExampleContainer>
        <Thing
          text="Clean up 10 old tickets on gitlab."
          person={people[0]}
          complete
        />
        <Thing
          text="Chat with someone who's given an OKR presentation to get some tips for my first OKR presentation."
          person={people[1]}
          complete
        />
        <Thing
          person={people[2]}
          text="Enjoy the nice weather with a coworker for lunch at washington square park."
        />
        <Thing
          person={people[3]}
          text="Learn what PRISM is. (It's my first month!)"
        />
        <Thing
          person={people[4]}
          text="Figure out what caused several SGO transfers to fail over the weekend."
        />
      </ExampleContainer>
      <ButtonContainer>
        <Button type="primary">Sign in with Gmail</Button>
      </ButtonContainer>
    </Page>
  );
}

const people = [
  { firstName: "Rufus", lastName: "SeatGeek" },
  { firstName: "Simone", lastName: "Biles" },
  { firstName: "Peyton", lastName: "Manning" },
  { firstName: "Janis", lastName: "Joplin" },
  { firstName: "Zacarias", lastName: "Ferreira" }
];
