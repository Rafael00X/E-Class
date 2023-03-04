import { GetServerSideProps } from "next";
import { getClassroomById } from "@/database/repositories/classroom";
import { Classroom } from "@/types/classroom";
import AssignmentCard from "@/components/Classroom/AssignmentCard";
import { assignmentMapper } from "@/types/assignment";
import { userPreviewMapper } from "@/types/user";
import Layout from "@/components/UI/Layout";

type ClassroomProps = {
  classroom: Classroom;
};

export default function ClassroomPage(props: ClassroomProps) {
  const { classroom } = props;
  const tabs = [
    { text: "Stream", url: `/classrooms/${classroom.id}` },
    { text: "Classwork", url: `/classrooms/${classroom.id}/assignments` },
    { text: "People", url: `/classrooms/${classroom.id}/people` },
  ];
  console.log(classroom);
  if (!classroom) throw new Error("Classroom not found");
  return (
    <Layout tabs={tabs} title={classroom.name}>
      <h1>{classroom.name}</h1>
      {classroom.assignments?.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </Layout>
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
