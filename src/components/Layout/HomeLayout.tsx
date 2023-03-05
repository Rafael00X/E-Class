import { ReactNode } from "react";
import Navbar from "../Common/Navbar";
import Container from "../UI/Container";

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout = (props: HomeLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Navbar tabs={[]} logo />
      <br />
      <Container>{children}</Container>
    </>
  );
};

export default HomeLayout;
