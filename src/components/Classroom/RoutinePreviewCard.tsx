import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Meet } from "@prisma/client";
import { CardActionArea, IconButton } from "@mui/material";
import Link from "next/link";
import CreateMeetForm from "../Form/CreateMeetForm";
import Modal from "../UI/Modal";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { deleteMeet } from "@/modules/fetch";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function RoutinePreviewCard(props: {
  meets: Meet[];
  isEditable: boolean;
  classroomId: string;
}) {
  const { isEditable, classroomId } = props;
  const [meets, setMeets] = useState(props.meets);
  const [open, setOpen] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);

  const handleClose = () => setOpen(false);
  const handleCallback = (meet: Meet) => {
    setMeets((p) => {
      return [...p, meet];
    });
    handleClose();
  };

  const handleRemove = (meet: Meet) => {
    deleteMeet(meet.id);
    setMeets((p) => p.filter((m) => m.id !== meet.id));
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 250, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Routine
        </Typography>
        <hr />
        {meets.map((meet) => (
          <MeetLine
            key={meet.id}
            meet={meet}
            isDeletable={isDeletable}
            handleRemove={handleRemove}
          />
        ))}
      </CardContent>
      {isEditable && !isDeletable && (
        <CardActions>
          <Button size="small" onClick={() => setOpen(true)}>
            Add
          </Button>
          <Button size="small" onClick={() => setIsDeletable(true)}>
            Edit
          </Button>
        </CardActions>
      )}
      {isEditable && isDeletable && (
        <CardActions>
          <Button size="small" onClick={() => setIsDeletable(false)}>
            Done
          </Button>
        </CardActions>
      )}
      <CreateMeetModal
        open={open}
        handleClose={handleClose}
        handleCallback={handleCallback}
        classroomId={classroomId}
      />
    </Card>
  );
}

function MeetLine(props: {
  meet: Meet;
  isDeletable: boolean;
  handleRemove: (meet: Meet) => void;
}) {
  const { meet, isDeletable, handleRemove } = props;

  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        width: "250px",
      }}
    >
      <a href={meet.url} target="_blank" style={{ overflow: "hidden" }}>
        <Typography noWrap>{meet.description}</Typography>
      </a>
      {isDeletable && (
        <IconButton onClick={() => handleRemove(meet)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Card>
  );

  // return (
  //   <Card raised={false} sx={{ boxShadow: 0, overflow: "hidden" }}>
  //     <CardActionArea sx={{ p: 1 }}>
  //       <Link href={meet.url} target="_blank">
  //       <Typography noWrap>{work}</Typography>
  //     {isEditable && (
  //       <IconButton onClick={() => handleRemove(work)}>
  //         <CloseIcon fontSize="small" />
  //       </IconButton>
  //     )}
  //         {/* <Typography variant="body2" noWrap>
  //           {bull} {meet.description}
  //         </Typography> */}
  //       </Link>
  //     </CardActionArea>
  //   </Card>
  // );
}

function CreateMeetModal(props: {
  open: boolean;
  handleClose: () => void;
  handleCallback: (meet: Meet) => void;
  classroomId: string;
}) {
  return (
    <Modal
      open={props.open}
      handleClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CreateMeetForm
        callback={props.handleCallback}
        classroomId={props.classroomId}
      />
    </Modal>
  );
}
