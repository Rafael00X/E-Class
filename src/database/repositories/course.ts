import prisma from "../prisma";

export const createCourse = async (name: string, classroomId: string) => {
  return await prisma.course.create({
    data: {
      name,
      classroomId,
    },
  });
};
