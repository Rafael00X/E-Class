import { meetRepository } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const classroomId = req.body.classroomId as string;
      const { description, url } = req.body;
      const meet = await meetRepository.createMeet(
        description,
        url,
        classroomId
      );
      return res.status(201).json({ meet });
    case "DELETE":
      const meetId = req.body.meetId as string;
      await meetRepository.deleteMeet(meetId);
      return res.status(200).json({ message: "Deleted successfully" });
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}
