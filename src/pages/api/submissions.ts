import { submissionRepository } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const userId = req.headers["user_id"] as string;
  let assignmentId: string;
  switch (req.method) {
    case "POST":
      assignmentId = req.body.assignmentId;
      const work = req.body.work;
      const newSubmission = await submissionRepository.createSubmission(
        work,
        assignmentId,
        userId
      );
      return res.status(201).json({ submission: newSubmission });
    case "GET":
      assignmentId = req.query.assignmentId as string;
      const submission = await submissionRepository.getSubmission(
        assignmentId,
        userId
      );
      return res.status(200).json({ submission });
    case "DELETE":
      const submissionId = req.body.submissionId as string;
      await submissionRepository.deleteSubmission(submissionId);
      return res.status(200).json({ message: "Unsubmitted successfully" });
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}
