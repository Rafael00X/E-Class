import { assignmentRepository } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userId = req.headers["user_id"] as string;
  switch (req.method) {
    case "POST":
      const { name, description, closedAt, classroomId, tag } = req.body;
      console.log(req.body);
      const assignment = null;
      // const assignment = await assignmentRepository.createAssignment(
      //   name,
      //   userId,
      //   classroomId,
      //   description,
      //   tag,
      //   closedAt
      // );
      return res.status(201).json({ assignment });

    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}
