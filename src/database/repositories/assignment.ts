import prisma from "../prisma";

export const getAssignmentById = async (assignmentId: string) => {
  return await prisma.assignment.findUniqueOrThrow({
    where: {
      id: assignmentId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      classroom: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const createAssignment = async (
  name: string,
  userId: string,
  classroomId: string,
  description: string,
  tag?: string,
  closedAt?: Date
) => {
  return await prisma.assignment.create({
    data: {
      name,
      description,
      tag,
      closedAt,
      author: {
        connect: {
          id: userId,
        },
      },
      classroom: {
        connect: {
          id: classroomId,
        },
      },
    },
  });
};

export const deleteAssignment = async (id: string) => {
  return await prisma.assignment.delete({
    where: {
      id,
    },
  });
};
