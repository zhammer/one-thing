import React from 'react';
import { Container, NavItem, Label, Content } from './Navbar.styles';
import Icon from '../Icon';
import { withRouter, RouteChildrenProps } from 'react-router';

function Navbar({ location }: RouteChildrenProps) {
  return (
    <Container>
      <Content>
        <NavItem.Logo to="/about">One Thing</NavItem.Logo>
        <NavItem.Icon to="/me" active={location.pathname === '/me'}>
          <Icon.Avatar />
          <Label>Me</Label>
        </NavItem.Icon>
        <NavItem.Icon to="/seatgeek" active={location.pathname === '/seatgeek'}>
          <Icon.Sofa />
          <Label>SeatGeek</Label>
        </NavItem.Icon>
        <NavItem.Icon to="/settings" active={location.pathname === '/settings'}>
          <Icon.Gear />
          <Label>Settings</Label>
        </NavItem.Icon>
      </Content>
    </Container>
  );
}

export default withRouter(Navbar);
