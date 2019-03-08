import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect } from "react-router";
import MePage from "./pages/MePage";
import SeatGeekPage from "./pages/SeatGeekPage";
import SettingsPage from "./pages/SettingsPage";
import useLoggedIn from "./hooks/useLoggedIn";

export default function AuthenticatedApp() {
  const loggedIn = useLoggedIn();

  return !loggedIn ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Navbar />
      <Route exact path="/me" component={MePage} />
      <Route exact path="/seatgeek" component={SeatGeekPage} />
      <Route exact path="/settings" component={SettingsPage} />
    </>
  );
}
