import { Assignment } from "@/types/assignment";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import moment from "moment";

type AssignmentCardProps = {
  assignment: Assignment;
};

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function AssignmentCard(props: AssignmentCardProps) {
  const { assignment } = props;
  const router = useRouter();
  const createdAt = moment(assignment.createdAt).format("MMM d");
  const closedAt = assignment.closedAt
    ? moment(assignment.closedAt).format("MMM d")
    : undefined;
  const link = `/classrooms/${assignment.classroomId}/assignments/${assignment.id}`;
  const handleClick = () => router.push(link);

  return (
    <Card sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ display: "flex", alignItems: "center", height: 80 }}>
          <Box sx={{ ml: 2, mr: 4 }}>
            <AssignmentIcon />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {`${assignment.author?.username} posted a new assignment: ${assignment.name}`}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {createdAt} {closedAt ? bull : null}
              {closedAt ? ` Due on ${closedAt}` : ""}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <VerticalMenu link={link} />
    </Card>
  );
}

function VerticalMenu(props: { link: string }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  let url = "";
  if (typeof window !== "undefined") {
    url = `${window.location.origin}${props.link}`;
  }

  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => console.log("Text copied"))
      .catch((err) => console.log(err));
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{ height: 80 }}
      >
        <MoreVertIcon />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      copyLink();
                      handleClose(e);
                    }}
                  >
                    Copy Link
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
