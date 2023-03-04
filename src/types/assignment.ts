import { UserPreview } from "./user";
import { Classroom } from "./classroom";
import { Assignment as AssignmentPrisma } from "@prisma/client";

export type Assignment = {
  id: string;
  name: string;
  description: string;
  tag?: string;
  createdAt: string;
  closedAt?: string;
  author?: UserPreview;
  classroomId: string;
  classroom?: Classroom;
};

export const assignmentMapper = (assignment: AssignmentPrisma) => {
  const data: Assignment = {
    id: assignment.id,
    name: assignment.name,
    description: assignment.description,
    tag: assignment.tag || undefined,
    createdAt: assignment.createdAt.toISOString(),
    closedAt: assignment.closedAt?.toISOString() || undefined,
    classroomId: assignment.classroomId,
  };
  return data;
};
