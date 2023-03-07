import React from "react";
import AddIcon from "@mui/icons-material/Add";

import Container from "../UI/Container";
import VerticalMenu from "../UI/VerticalMenu";
import Navbar from "../Common/Navbar";
import { Modal } from "@mui/material";
import JoinClassroomForm from "../Form/JoinClassroomForm";
import CreateClassroomForm from "../Form/CreateClassroomForm";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout(props: HomeLayoutProps) {
  const { children } = props;
  const [openJoin, setOpenJoin] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const menuItems = [
    { text: "Join Class", onClick: () => setOpenJoin(true) },
    { text: "Create Class", onClick: () => setOpenCreate(true) },
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
      <JoinClassroomModal
        open={openJoin}
        handleClose={() => {
          setOpenJoin(false);
        }}
      />
      <CreateClassroomModal
        open={openCreate}
        handleClose={() => {
          setOpenCreate(false);
        }}
      />
      <Container>{children}</Container>
    </>
  );
}

function JoinClassroomModal(props: { open: boolean; handleClose: () => void }) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <JoinClassroomForm callback={props.handleClose} />
    </Modal>
  );
}

function CreateClassroomModal(props: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CreateClassroomForm callback={props.handleClose} />
    </Modal>
  );
}
