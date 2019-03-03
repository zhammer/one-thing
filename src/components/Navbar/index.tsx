import React from "react";
import { Container, NavItem,  Label } from "./Navbar.styles";
import Icon from "../Icon";

export default function Navbar() {
  return (
    <Container>
      <NavItem.Logo>One Thing</NavItem.Logo>
      <NavItem.Icon>
        <Icon.Avatar />
        <Label>Me</Label>
      </NavItem.Icon>
      <NavItem.Icon>
        <Icon.Sofa />
        <Label>SeatGeek</Label>
      </NavItem.Icon>
      <NavItem.Icon>
        <Icon.Gear />
        <Label>Settings</Label>
      </NavItem.Icon>
    </Container>
  );
}
