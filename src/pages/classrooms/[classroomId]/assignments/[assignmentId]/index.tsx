import { GetServerSideProps } from "next";
import { Assignment, assignmentMapper } from "@/types/assignment";
import { getAssignmentById } from "@/database/repositories/assignment";
import AssignmentLayout from "@/components/Layout/AssignmentLayout";

type AssignmentProps = {
  assignment: Assignment;
};

export default function AssignmentPage(props: AssignmentProps) {
  const { assignment } = props;
  if (!assignment) return <h1>Assignment not found</h1>;

  return (
    <AssignmentLayout
      title={assignment.classroom?.name as string}
      assignmentId={assignment.id}
      classroomId={assignment.classroom?.id as string}
    >
      <div>
        <h1>{assignment.name}</h1>
        <p>{assignment.description}</p>
        <h3>{assignment.classroom?.name}</h3>
      </div>
    </AssignmentLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assignmentId = context.params?.assignmentId as string;
  const result = await getAssignmentById(assignmentId);
  const assignment = assignmentMapper(result);
  assignment.author = result.author;
  assignment.classroom = result.classroom;

  return {
    props: {
      assignment,
    },
  };
};
