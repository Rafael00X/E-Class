import prisma from "../prisma";

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
  const user = prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  return user;
};
