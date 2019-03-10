import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Thing from "../../components/Thing";
import Button from "../../components/Button";
import { isMobile } from "react-device-detect";
import { ExampleContainer, ButtonContainer, SeatGeekBlue } from "./LoginPage.styles";
import { ThingInterface } from "../../types";

export default function LoginPage() {
  const things = isMobile ? mobileThings : allThings;
  return (
    <Page.Full>
      <Title>One Thing</Title>
      <Subtitle>
        One thing you want to do this week, together with others at{" "}
        <SeatGeekBlue>SeatGeek</SeatGeekBlue>.
      </Subtitle>
      <ExampleContainer>
        {things.map((thing, index) => (
          <Thing thing={thing} key={index} />
        ))}
      </ExampleContainer>
      <ButtonContainer>
        <Button.Primary>Sign in with Gmail</Button.Primary>
      </ButtonContainer>
    </Page.Full>
  );
}

const allThings: ThingInterface[] = [
  {
    description: "Clean up 10 old tickets on gitlab.",
    person: { firstName: "Rufus", lastName: "SeatGeek" },
    complete: true
  },
  {
    description:
      "Chat with someone who's given an OKR presentation to get some tips for my first OKR presentation.",
    person: { firstName: "Simone", lastName: "Biles" },
    complete: true
  },
  {
    description:
      "Enjoy the nice weather with a coworker for lunch at washington square park.",
    person: { firstName: "Peyton", lastName: "Manning" },
    complete: false
  },
  {
    description: "Learn what PRISM is. (It's my first month!)",
    person: { firstName: "Janis", lastName: "Joplin" },
    complete: false
  },
  {
    description:
      "Figure out what caused several SGO transfers to fail over the weekend.",
    person: { firstName: "Zacarias", lastName: "Ferreira" },
    complete: false
  }
];

const mobileThings = [allThings[0], allThings[3], allThings[4]];
