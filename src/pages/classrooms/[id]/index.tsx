import { GetServerSideProps } from "next";
import { getClassroomById } from "@/database/repositories/classroom";
import { Classroom } from "@/types/classroom";
import AssignmentCard from "@/components/Classroom/AssignmentCard";
import { Assignment, assignmentMapper } from "@/types/assignment";

type ClassroomProps = {
  classroom: Classroom;
};

export default function ClassroomPage(props: ClassroomProps) {
  const { classroom } = props;
  console.log(classroom);
  if (!classroom) throw new Error("Classroom not found");
  return (
    <div>
      <h1>{classroom.name}</h1>
      {classroom.students?.map((student) => (
        <h6 key={student.id}>{student.username}</h6>
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
    assignments: result.assignments.map((a) => {
      const assignment = assignmentMapper(a);
      assignment.author = {
        id: a.author.id,
        email: a.author.email,
        username: a.author.username,
      };
      return assignment;
    }),
  };

  return {
    props: {
      classroom,
    },
  };
};
