export interface PersonInterface {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ThingInterface {
  id: string;
  person: PersonInterface;
  description: string;
  complete: boolean;
}
