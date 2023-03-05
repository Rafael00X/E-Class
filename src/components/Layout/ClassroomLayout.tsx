import { ReactNode } from "react";
import Navbar from "../Common/Navbar";
import Container from "../UI/Container";

type ClassroomLayoutProps = {
  classroomId: string;
  children: ReactNode;
  title: string;
};

const ClassroomLayout = (props: ClassroomLayoutProps) => {
  const { title, classroomId, children } = props;
  const tabs = [
    { text: "Stream", url: `/classrooms/${classroomId}` },
    { text: "Classwork", url: `/classrooms/${classroomId}/assignments` },
    { text: "People", url: `/classrooms/${classroomId}/people` },
  ];
  return (
    <>
      <Navbar tabs={tabs} title={title} />
      <br />
      <Container>{children}</Container>
    </>
  );
};

export default ClassroomLayout;
