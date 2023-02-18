import { User } from "./user";

export type Classroom = {
  id: string;
  name: string;
  students?: User[];
};
