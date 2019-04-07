import { Gateways, Person } from "./types";

export async function getPerson(
  gateways: Gateways,
  personId: string
): Promise<Person | null> {
  return await gateways.databaseGateway.fetchPerson(personId);
}
