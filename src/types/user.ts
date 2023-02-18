export type User = {
  id: String;
  username: String;
  email: String;
  classrooms?: Classroom[];
};

export type Classroom = {
  id: String;
  name: String;
  students?: User[];
};
