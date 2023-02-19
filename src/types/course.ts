import { Classroom } from "./classroom";

export type Course = {
  id: string;
  name: string;
  classroom?: Classroom;
};
