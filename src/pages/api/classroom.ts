// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { classroomRepository, userRepository } from "@/database";
import { User } from "@prisma/client";

type Data = {
  user?: User;
  message?: string;
  classroom?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      if (req.query.task === "enroll") return enrollToClassroom(req, res);
      return addClassroom(req, res);
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}

const addClassroom = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const userId = req.headers["user_id"] as string;
  const name = req.body.name;
  const classroom = await classroomRepository.createClassroom(name, userId);
  return res.status(201).json({ classroom });
};

const enrollToClassroom = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const userId = req.headers["user_id"] as string;
  const classroomId = req.body.classroomId;
  const classroom = await classroomRepository.addStudentToClassroom(
    userId,
    classroomId
  );
  return res.status(201).json({ classroom });
};
