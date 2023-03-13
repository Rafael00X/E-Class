import prisma from "../prisma";

export const createSubmission = async (
  work: string[],
  assignmentId: string,
  userId: string
) => {
  return await prisma.submission.create({
    data: {
      work,
      student: {
        connect: {
          id: userId,
        },
      },
      assignment: {
        connect: {
          id: assignmentId,
        },
      },
    },
  });
};

export const deleteSubmission = async (submissionId: string) => {
  return await prisma.submission.delete({
    where: {
      id: submissionId,
    },
  });
};

export const getSubmission = async (assignmentId: string, userId: string) => {
  return await prisma.submission.findFirst({
    where: {
      assignmentId,
      studentId: userId,
    },
  });
};
