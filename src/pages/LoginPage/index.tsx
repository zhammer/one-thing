import React from "react";
import "./LoginPage.scss";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Thing from "../../components/Thing";
import Button from "../../components/Button";

export default function LoginPage() {
  return (
    <Page>
      <Title>One Thing</Title>
      <Subtitle>
        One thing you want to do today, together with others at{" "}
        <span className="seatgeek-blue">SeatGeek</span>.
      </Subtitle>
      <div className="example-container">
        <Thing text="Clean up 10 old tickets on gitlab." complete />
        <Thing
          text="Chat with someone who's given an OKR presentation to get some tips for my first OKR presentation tomorrow."
          complete
        />
        <Thing
          text="Enjoy the nice weather with a coworker for lunch at washington square park."
        />
        <Thing text="Learn what PRISM is. (It's my first week!)"/>
        <Thing
          text="Figure out what caused several SGO transfers to fail over the weekend."
        />
      </div>
      <div className='button-container'>
        <Button type='primary'>Sign in with Gmail</Button>
      </div>
    </Page>
  );
}
