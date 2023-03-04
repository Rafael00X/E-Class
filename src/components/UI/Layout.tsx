import { ReactNode } from "react";
import Navbar from "../Common/Navbar";
import Container from "./Container";

type LayoutProps = {
  logo: boolean;
  tabs: { text: string; url: string }[];
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Navbar logo={props.logo} tabs={props.tabs} />
      <Container>{props.children}</Container>
    </>
  );
};

export default Layout;
