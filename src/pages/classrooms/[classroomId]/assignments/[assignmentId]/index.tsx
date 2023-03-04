import { GetServerSideProps } from "next";
import { Assignment, assignmentMapper } from "@/types/assignment";
import { getAssignmentById } from "@/database/repositories/assignment";

type AssignmentProps = {
  assignment: Assignment | null;
};

export default function AssignmentPage(props: AssignmentProps) {
  const { assignment } = props;
  console.log(assignment);
  if (!assignment) return <h1>Assignment not found</h1>;
  return (
    <div>
      <h1>{assignment.name}</h1>
      <p>{assignment.description}</p>
      <h3>{assignment.classroom?.name}</h3>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assignmentId = context.params?.assignmentId as string;
  const result = await getAssignmentById(assignmentId);
  console.log("From Assignment page");
  console.log(result);
  const assignment = assignmentMapper(result);
  assignment.author = result.author;
  assignment.classroom = result.classroom;

  return {
    props: {
      assignment,
    },
  };
};
