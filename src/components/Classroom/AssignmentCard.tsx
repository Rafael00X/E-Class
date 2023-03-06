import { Assignment } from "@/types/assignment";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import moment from "moment";
import { grey } from "@mui/material/colors";
import VerticalMenu from "../UI/VerticalMenu";

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
  const handleCopyLink = () => {
    const url = window.location.origin + link;
    navigator.clipboard.writeText(url);
  };

  const verticalMenuItems = [
    { text: "Copy Link", onClick: handleCopyLink },
    { text: "Edit", onClick: () => {} },
  ];

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 2, mr: 4 }}>
            <Avatar sx={{ bgcolor: grey[600] }}>
              <AssignmentIcon />
            </Avatar>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: "bold" }}>
              {`${assignment.author?.username} posted a new assignment: ${assignment.name}`}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontSize: 14 }}
            >
              {createdAt} {closedAt ? bull : null}
              {closedAt ? ` Due on ${closedAt}` : ""}
            </Typography>
          </Box>
          <VerticalMenu icon={<MoreVertIcon />} items={verticalMenuItems} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
