import prisma from "../prisma";

export const createMeet = async (
  description: string,
  url: string,
  classroomId: string
) => {
  return await prisma.meet.create({
    data: {
      description,
      url,
      classroom: {
        connect: {
          id: classroomId,
        },
      },
    },
  });
};

export const deleteMeet = async (id: string) => {
  return await prisma.assignment.delete({
    where: {
      id,
    },
  });
};
