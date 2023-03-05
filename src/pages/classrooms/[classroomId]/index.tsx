import { GetServerSideProps } from "next";
import { getClassroomById } from "@/database/repositories/classroom";
import { Classroom } from "@/types/classroom";
import { assignmentMapper } from "@/types/assignment";
import { userPreviewMapper } from "@/types/user";
import AssignmentCard from "@/components/Classroom/AssignmentCard";
import ClassroomLayout from "@/components/Layout/ClassroomLayout";

type ClassroomProps = {
  classroom: Classroom;
};

export default function ClassroomPage(props: ClassroomProps) {
  const { classroom } = props;
  if (!classroom) throw new Error("Classroom not found");
  return (
    <ClassroomLayout title={classroom.name} classroomId={classroom.id}>
      {classroom.assignments?.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </ClassroomLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;
  const result = await getClassroomById(classroomId);
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
