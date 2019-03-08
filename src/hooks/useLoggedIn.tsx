import { useState } from "react";

/**
 * Hook to check if the user is logged in (has an access token in local storage) on component mount.
 */
export default function useLoggedIn() {
  const [loggedIn] = useState(() => Boolean(localStorage.getItem("accessToken")));
  return loggedIn;
}
