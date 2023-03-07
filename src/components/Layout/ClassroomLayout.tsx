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
  const classUrl = `/classrooms/${classroomId}`;
  const tabs = [
    { text: "Stream", url: `${classUrl}` },
    { text: "Classwork", url: `${classUrl}/assignments` },
    { text: "People", url: `${classUrl}/people` },
  ];
  return (
    <>
      <Navbar tabs={tabs} title={title} url={classUrl} />
      <Container>{children}</Container>
    </>
  );
};

export default ClassroomLayout;
