import { useQuery, useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

const LOG_OUT = gql`
  mutation LogOut {
    logOut @client {
      success
    }
  }
`;

/**
 * Hook to check if the user is logged in (has an access token in local storage) on component mount.
 */
export default function useLoginStatus(): [boolean, () => void] {
  const { data } = useQuery(IS_LOGGED_IN);
  const logout = useMutation(LOG_OUT);
  return [data.isLoggedIn, logout];
}
