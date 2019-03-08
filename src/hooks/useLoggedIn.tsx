import { useState, useEffect } from "react";

/**
 * Hook to check if the user is logged in (has an access token in local storage).
 */
export default function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(getIsLoggedIn);

  useEffect(() => {
    const currentlyLoggedIn = getIsLoggedIn();
    if (currentlyLoggedIn != loggedIn) {
      setLoggedIn(currentlyLoggedIn);
    }
  }, [loggedIn]);

  return loggedIn;
}

function getIsLoggedIn() {
  return Boolean(localStorage.getItem("accessToken"));
}
