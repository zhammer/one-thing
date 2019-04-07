import React, { useEffect, useState } from 'react';
import useLoginStatus from '../../hooks/useLoginStatus';
import { Redirect } from 'react-router';
import Auth from '../../auth';

export default function CallbackPage() {
  const [isLoggedIn, , login] = useLoginStatus();
  const [authError, setAuthError] = useState(false);
  useEffect(() => {
    handleCallbackPageLoaded();
  }, []);

  async function handleCallbackPageLoaded() {
    try {
      const accessToken = await new Auth().parseAccessToken();
      login(accessToken);
    } catch (e) {
      setAuthError(true);
    }
  }

  if (isLoggedIn) return <Redirect to="/me" />;
  if (authError) return <Redirect to="/login" />;
  return <div>Loading...</div>;
}
