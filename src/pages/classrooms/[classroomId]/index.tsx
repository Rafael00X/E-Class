import { GetServerSideProps } from "next";
import { getClassroomById } from "@/database/repositories/classroom";
import { Classroom } from "@/types/classroom";
import AssignmentCard from "@/components/Classroom/AssignmentCard";
import { assignmentMapper } from "@/types/assignment";
import { userPreviewMapper } from "@/types/user";

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
      {classroom.assignments?.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;
  const result = await getClassroomById(classroomId);
  console.log(result);
  const classroom: Classroom = {
    name: result.name,
    id: result.id,
    students: result.students,
    assignments: result.assignments.map((a) => {
      const assignment = assignmentMapper(a);
      assignment.author = userPreviewMapper(a.author);
      return assignment;
    }),
  };

  return {
    props: {
      classroom,
    },
  };
};
