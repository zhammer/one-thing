import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";

const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

/**
 * Hook to check if the user is logged in (has an access token in local storage) on component mount.
 */
export default function useLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn;
}
