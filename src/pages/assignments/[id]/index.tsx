import { GetServerSideProps } from "next";
import { Assignment, assignmentMapper } from "@/types/assignment";
import { getAssignmentById } from "@/database/repositories/assignment";

type AssignmentProps = {
  assignment: Assignment | null;
};

export default function ClassroomPage(props: AssignmentProps) {
  const { assignment } = props;
  console.log(assignment);
  if (!assignment) return <h1>Assignment not found</h1>;
  return (
    <div>
      <h1>{assignment.name}</h1>
      <p>{assignment.description}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assignmentId = context.params?.id as string;
  const result = await getAssignmentById(assignmentId);
  console.log("From Assignment page");
  console.log(result);
  const assignment = assignmentMapper(result);

  return {
    props: {
      assignment,
    },
  };
};
