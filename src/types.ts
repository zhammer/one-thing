export interface PersonInterface {
  firstName: string;
  lastName: string;
}

export interface ThingInterface {
  id: string;
  person: PersonInterface;
  description: string;
  complete: boolean;
}
