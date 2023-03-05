import React from "react";
import AddIcon from "@mui/icons-material/Add";

import Container from "../UI/Container";
import VerticalMenu from "../UI/VerticalMenu";
import Navbar from "../Common/Navbar";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout(props: HomeLayoutProps) {
  const { children } = props;
  const menuItems = [
    { text: "Join Class", onClick: () => {} },
    { text: "Create Class", onClick: () => {} },
  ];
  return (
    <>
      <Navbar
        tabs={[]}
        misc={
          <VerticalMenu icon={<AddIcon fontSize="large" />} items={menuItems} />
        }
        logo
      />
      <br />
      <Container>{children}</Container>
    </>
  );
}
