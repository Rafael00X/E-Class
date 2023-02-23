import prisma from "../prisma";

const classroomFilter = {
  select: {
    id: true,
    name: true,
    admin: {
      select: {
        id: true,
        username: true,
        email: true,
      },
    },
  },
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      adminClassrooms: classroomFilter,
      teacherClassrooms: classroomFilter,
      studentClassrooms: classroomFilter,
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
