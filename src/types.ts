export interface PersonInterface {
  firstName: string;
  lastName: string;
}

export interface ThingInterface {
  person: PersonInterface;
  description: string;
  complete: boolean;
}
