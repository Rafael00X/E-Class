import prisma from "../prisma";

export const getClassroomById = async (classroomId: string) => {
  return await prisma.classroom.findUniqueOrThrow({
    where: {
      id: classroomId,
    },
    include: {
      students: true,
    },
  });
};

export const createClassroom = async (name: string) => {
  return await prisma.classroom.create({
    data: {
      name,
    },
  });
};

export const addUserToClassroom = async (
  userId: string,
  classroomId: string
) => {
  const classroom = await prisma.classroom.findUniqueOrThrow({
    where: {
      id: classroomId,
    },
  });
  if (classroom.studentIds.find((id) => id === userId))
    throw new Error("Already enrolled in class");
  return await prisma.classroom.update({
    where: {
      id: classroomId,
    },
    data: {
      studentIds: {
        push: userId,
      },
    },
  });
};
