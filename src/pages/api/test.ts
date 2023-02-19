import type { NextApiRequest, NextApiResponse } from "next";
import {
  classroomRepository,
  courseRepository,
  userRepository,
} from "@/database";
import { Classroom, User } from "@prisma/client";
import { Course } from "@/types/course";

type Data = {
  classroom?: Classroom;
  course?: Course;
  user?: User;
  message?: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const name = "New Classroom 5";
//   const classroom = await classroomRepository.createClassroom(name);
//   return res.status(201).json({ classroom });
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     const userId = req.query.userId as string;
//     const classroomId = req.query.classroomId as string;
//     if (!classroomId || !userId) throw new Error("Invalid properties");
//     const classroom = await classroomRepository.addUserToClassroom(
//       userId,
//       classroomId
//     );
//     const user = await userRepository.addClassroomToUser(classroomId, userId);

//     return res.status(201).json({ user });
//   } catch (err) {
//     console.log(err);
//     if (err instanceof Error) res.status(404).json({ message: err.message });
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     const classroomId = req.query.classroomId as string;
//     const classroom = await classroomRepository.getClassroomById(classroomId);
//     if (!classroom) throw new Error("Didn't find classroom");
//     return res.status(201).json({ classroom });
//   } catch (err) {
//     console.log(err);
//   }
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   try {
//     const { classroomId, name } = req.body;
//     if (!classroomId || !name) throw new Error("Invalid properties");
//     const course = await courseRepository.createCourse(name, classroomId);

//     return res.status(201).json({ course });
//   } catch (err) {
//     console.log(err);
//     if (err instanceof Error) res.status(404).json({ message: err.message });
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const classroomId = req.query.classroomId as string;
    if (!classroomId) throw new Error("Invalid properties");
    const classroom = await classroomRepository.getClassroomById(classroomId);

    return res.status(201).json({ classroom });
  } catch (err) {
    console.log(err);
    if (err instanceof Error) res.status(404).json({ message: err.message });
  }
}
