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
import React from "react";
import moment from "moment";
import { grey } from "@mui/material/colors";

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

export default function AssignmentReviewCard(props: AssignmentCardProps) {
  const { assignment } = props;
  const router = useRouter();
  const createdAt = moment(assignment.createdAt).format("MMM D");
  const closedAt = assignment.closedAt
    ? moment(assignment.closedAt).format("MMM D")
    : undefined;
  const link = `/classrooms/${assignment.classroomId}/assignments/${assignment.id}`;

  const handleClick = () => router.push(link);

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 2 }}>
            <Avatar sx={{ bgcolor: grey[600] }}>
              <AssignmentIcon />
            </Avatar>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: "bold" }}>
              {`${assignment.name}`}
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
