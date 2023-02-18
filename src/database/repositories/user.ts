import prisma from "../prisma";

export const getUserById = async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      classrooms: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
};

export const addClassroomToUser = async (
  classroomId: string,
  userId: string
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });
  if (user.classroomIds.find((id) => id === classroomId))
    throw new Error("Already enrolled in class");
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      classroomIds: {
        push: classroomId,
      },
    },
  });
};
