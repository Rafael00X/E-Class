import { Assignment } from "./assignment";
import { UserPreview } from "./user";
import { Classroom as ClassroomPrisma } from "@prisma/client";

export type Classroom = {
  id: string;
  name: string;
  students?: UserPreview[];
  assignments?: Assignment[];
};

export const classroomMapper = (classroom: ClassroomPrisma) => {
  const data: Classroom = {
    id: classroom.id,
    name: classroom.name,
  };
  return data;
};
