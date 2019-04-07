import { Gateways, Thing } from "./types";
import { weekTimeRange } from "./util";
import {
  AlreadySubmittedThingThisWeekError,
  NoThingThisWeekError
} from "./exceptions";

export async function getAllThingsThisWeek(
  gateways: Gateways
): Promise<Thing[]> {
  const now = new Date();
  const { from, to } = weekTimeRange(now);
  return await gateways.databaseGateway.fetchThings({
    from,
    to
  });
}

export async function getPersonsThingThisWeek(
  gateways: Gateways,
  personId: string
): Promise<Thing | null> {
  const now = new Date();
  const { from, to } = weekTimeRange(now);
  const things = await gateways.databaseGateway.fetchThingsOfPerson(personId, {
    from,
    to
  });
  return things.length > 0 ? things[0] : null;
}

export async function submitThing(
  gateways: Gateways,
  personId: string,
  description: string
): Promise<Thing> {
  const personThingThisWeek = await getPersonsThingThisWeek(gateways, personId);
  if (personThingThisWeek) {
    throw new AlreadySubmittedThingThisWeekError();
  }
  return await gateways.databaseGateway.addThing(personId, description);
}

export async function completePersonsThingThisWeek(
  gateways: Gateways,
  personId: string
): Promise<null> {
  const personsThingThisWeek = await getPersonsThingThisWeek(
    gateways,
    personId
  );
  if (!personsThingThisWeek) {
    throw new NoThingThisWeekError();
  }
  return await gateways.databaseGateway.setThingComplete(
    personsThingThisWeek.id
  );
}
