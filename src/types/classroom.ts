import { User } from "./user";

export type Classroom = {
  id: String;
  name: String;
  students?: User[];
};
