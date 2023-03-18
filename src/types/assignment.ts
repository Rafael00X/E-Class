import { UserPreview } from "./user";
import { Classroom } from "./classroom";
import { Assignment as AssignmentPrisma, Submission } from "@prisma/client";

export type Assignment = {
  id: string;
  name: string;
  description: string;
  tag: string | null;
  createdAt: string;
  closedAt: string | null;
  author?: UserPreview;
  classroomId: string;
  classroom?: Classroom;
  submissions?: Submission[];
};

export const assignmentMapper = (assignment: AssignmentPrisma) => {
  const data: Assignment = {
    id: assignment.id,
    name: assignment.name,
    description: assignment.description,
    tag: assignment.tag || null,
    createdAt: assignment.createdAt.toISOString(),
    closedAt: assignment.closedAt?.toISOString() || null,
    classroomId: assignment.classroomId,
  };
  return data;
};
