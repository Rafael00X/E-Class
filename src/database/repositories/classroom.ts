import prisma from "../prisma";

export const getClassroomById = async (classroomId: string) => {
  return await prisma.classroom.findUniqueOrThrow({
    where: {
      id: classroomId,
    },
    include: {
      admin: true,
      students: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      teachers: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      courses: true,
    },
  });
};

export const createClassroom = async (name: string, userId: string) => {
  return await prisma.classroom.create({
    data: {
      name,
      admin: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const addStudentToClassroom = async (
  userId: string,
  classroomId: string
) => {
  return await prisma.classroom.update({
    where: {
      id: classroomId,
    },
    data: {
      students: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const addTeacherToClassroom = async (
  userId: string,
  classroomId: string
) => {
  return await prisma.classroom.update({
    where: {
      id: classroomId,
    },
    data: {
      teachers: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
