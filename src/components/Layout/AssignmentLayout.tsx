import { ReactNode } from "react";
import Navbar from "../Common/Navbar";
import Container from "../UI/Container";

type AssignmentLayoutProps = {
  title: string;
  assignmentId: string;
  classroomId: string;
  children: ReactNode;
};

const AssignmentLayout = (props: AssignmentLayoutProps) => {
  const { title, assignmentId, classroomId, children } = props;
  const tabs = [
    {
      text: "Instructions",
      url: `/classrooms/${classroomId}/assignments/${assignmentId}`,
    },
    {
      text: "Progress",
      url: `/classrooms/${classroomId}/assignments/${assignmentId}/submissions`,
    },
  ];
  return (
    <>
      <Navbar tabs={tabs} title={title} />
      <br />
      <Container>{children}</Container>
    </>
  );
};

export default AssignmentLayout;
