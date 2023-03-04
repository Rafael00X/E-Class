import Layout from "@/components/UI/Layout";
import { classroomRepository } from "@/database/";
import { assignmentMapper } from "@/types/assignment";
import { Classroom } from "@/types/classroom";
import { userPreviewMapper } from "@/types/user";
import { GetServerSideProps } from "next";

type AssignmentPageProps = {
  classroom: Classroom;
};

export default function AssignmentsPage(props: AssignmentPageProps) {
  const classroom = props.classroom;
  const tabs = [
    { text: "Stream", url: `/classrooms/${classroom.id}` },
    { text: "Classwork", url: `/classrooms/${classroom.id}/assignments` },
    { text: "People", url: `/classrooms/${classroom.id}/people` },
  ];
  return (
    <Layout logo={false} tabs={tabs}>
      <h1>Assignments of {classroom.name}</h1>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;
  const result = await classroomRepository.getClassroomById(classroomId);
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
