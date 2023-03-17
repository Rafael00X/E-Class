import { assignmentRepository } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userId = req.headers["user_id"] as string;
  switch (req.method) {
    case "DELETE":
      const assignmentId = req.query.assignmentId as string;

      const assignment = await assignmentRepository.deleteAssignment(
        assignmentId
      );
      return res.status(201).json({ assignment });

    case "PUT":
      // TODO
      return res.status(200).json({ message: "Edited" });

    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}
