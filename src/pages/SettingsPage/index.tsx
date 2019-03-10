import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import useLoginStatus from "../../hooks/useLoginStatus";
import Button from "../../components/Button";
import { ButtonContainer } from "./SettingsPage.styles";

export default function SettingsPage() {
  const [_, logout] = useLoginStatus();
  return (
    <Page.BesideNav>
      <Title>Settings</Title>
      <ButtonContainer>
        <Button.Danger onClick={logout}>Log out</Button.Danger>
      </ButtonContainer>
    </Page.BesideNav>
  );
}
