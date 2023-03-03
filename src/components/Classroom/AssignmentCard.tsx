import { Assignment } from "@/types/assignment";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

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
  const handleClick = () =>
    // router.push(
    //   `/classrooms/${assignment.classroomId}/assignments/${assignment.id}`
    // );
    router.push(`/assignments/${assignment.id}`);
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h5" component="div">
            {assignment.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {assignment.author?.username}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {assignment.createdAt + " "} {bull} {" " + assignment.closedAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
