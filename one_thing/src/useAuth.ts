import { Person, Gateways } from './types';

export async function login(gateways: Gateways, auth0UserId: string): Promise<Person> {
  const person = await gateways.databaseGateway.fetchPersonByAuth0UserId(auth0UserId);
  if (person) {
    return person;
  }
  const { email, firstName, lastName } = await gateways.auth0Gateway.fetchUserInfo(auth0UserId);
  return await gateways.databaseGateway.addPerson(auth0UserId, email, firstName, lastName);
}
