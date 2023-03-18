import { assignmentRepository } from "@/database";
import prisma from "@/database/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userId = req.headers["user_id"] as string;
  const assignmentId = req.query.assignmentId as string;
  switch (req.method) {
    case "DELETE":
      const assignment = await assignmentRepository.deleteAssignment(
        assignmentId
      );
      return res.status(201).json({ assignment });

    case "PUT":
      // TODO
      const name = req.body.name as string;
      const description = req.body.description as string;
      const tag = req.body.tag as string | null;
      const closedAt = req.body.closedAt as string;
      const editedAssignment = await prisma.assignment.update({
        where: {
          id: assignmentId,
        },
        data: {
          name,
          description,
          tag,
          closedAt,
        },
      });
      console.log(editedAssignment);

      return res.status(200).json({ editedAssignment });

    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}
