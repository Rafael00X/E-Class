import { Classroom } from "./classroom";

export type User = {
  id: String;
  username: String;
  email: String;
  classrooms?: Classroom[];
};

export type UserPreview = {
  id: String;
  username: String;
  email: String;
};
