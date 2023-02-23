import AssignmentsPreviewCard from "@/components/Home/AssignmentsPreviewCard";
import RoutinePreviewCard from "@/components/Home/RoutinePreviewCard";
import ClassGrid from "@/components/Home/ClassGrid";
import { userRepository } from "@/database";
import { User } from "@/types/user";
import Box from "@mui/material/Box";
import { GetServerSideProps } from "next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getClassroomById } from "@/database/repositories/classroom";
import { Classroom } from "@/types/classroom";

type ClassroomProps = {
  classroom: Classroom;
};

export default function ClassroomPage(props: ClassroomProps) {
  const { classroom } = props;
  if (!classroom) throw new Error("Classroom not found");
  return (
    <div>
      <h1>{classroom.name}</h1>
      {classroom.students?.map((student) => (
        <h6>{student.username}</h6>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.id as string;
  const result = await getClassroomById(classroomId);
  console.log(result);
  const classroom: Classroom = {
    name: result.name,
    id: result.id,
    students: result.students,
  };

  return {
    props: {
      classroom,
    },
  };
};
