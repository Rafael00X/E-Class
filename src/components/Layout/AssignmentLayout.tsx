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
  const classUrl = `/classrooms/${classroomId}`;
  const tabs = [
    {
      text: "Instructions",
      url: `${classUrl}/assignments/${assignmentId}`,
    },
    {
      text: "Progress",
      url: `${classUrl}/assignments/${assignmentId}/submissions`,
    },
  ];
  return (
    <>
      <Navbar tabs={tabs} title={title} url={classUrl} />
      <Container>{children}</Container>
    </>
  );
};

export default AssignmentLayout;
