import { GetServerSideProps } from "next";
import { Assignment } from "@/types/assignment";

type AssignmentProps = {
  assignment: Assignment | null;
};

export default function ClassroomPage(props: AssignmentProps) {
  const { assignment } = props;
  console.log(assignment);
  if (!assignment) return <h1>Error</h1>;
  return (
    <div>
      <h1>{assignment.name}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assignmentId = context.params?.id as string;
  // const result = await getClassroomById(classroomId);
  // console.log(result);
  // const classroom: Classroom = {
  //   name: result.name,
  //   id: result.id,
  //   students: result.students,
  //   assignments: result.assignments.map((a) => {
  //     const assignment = assignmentMapper(a);
  //     assignment.author = userPreviewMapper(a.author);
  //     return assignment;
  //   }),
  // };

  return {
    props: {
      assignment: null,
    },
  };
};
