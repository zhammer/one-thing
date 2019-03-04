import React from "react";
import Navbar from "../../components/Navbar";
import { Route } from "react-router";
import MePage from "../MePage";
import SeatGeekPage from "../SeatGeekPage";
import SettingsPage from "../SettingsPage";

export default function AuthenticatedApp() {
  return (
    <>
      <Navbar />
      <Route exact path="/me" component={MePage} />
      <Route exact path="/seatgeek" component={SeatGeekPage} />
      <Route exact path="/settings" component={SettingsPage} />
    </>
  );
}
