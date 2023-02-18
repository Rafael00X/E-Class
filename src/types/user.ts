import { Classroom } from "./classroom";

export type User = {
  id: string;
  username: string;
  email: string;
  classrooms?: Classroom[];
};

export type UserPreview = {
  id: string;
  username: string;
  email: string;
};
