import { GetServerSideProps } from "next";
import { Assignment, assignmentMapper } from "@/types/assignment";
import { getAssignmentById } from "@/database/repositories/assignment";
import AssignmentLayout from "@/components/Layout/AssignmentLayout";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import moment from "moment";
import VerticalMenu from "@/components/UI/VerticalMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { grey } from "@mui/material/colors";
import Submission from "@/components/Assignment/Submission";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

type AssignmentProps = {
  assignment: Assignment;
};

export default function AssignmentPage(props: AssignmentProps) {
  const { assignment } = props;
  const createdAt = moment(assignment.createdAt).format("MMM d");
  const closedAt = assignment.closedAt
    ? moment(assignment.closedAt).format("MMM d")
    : undefined;
  const link = `/classrooms/${assignment.classroomId}/assignments/${assignment.id}`;

  const handleCopyLink = () => {
    const url = window.location.origin + link;
    navigator.clipboard.writeText(url);
  };

  const verticalMenuItems = [
    { text: "Copy Link", onClick: handleCopyLink },
    { text: "Edit", onClick: () => {} },
    { text: "Delete", onClick: () => {} },
  ];

  if (!assignment) return <h1>Assignment not found</h1>;

  return (
    <AssignmentLayout
      title={assignment.classroom?.name as string}
      assignmentId={assignment.id}
      classroomId={assignment.classroom?.id as string}
    >
      <Box
        sx={{
          display: { sm: "block", md: "flex" },
          maxWidth: "1200px",
          m: "auto",
        }}
      >
        <Box sx={{ flexGrow: 1, m: "auto", mb: 6, mt: 0, display: "flex" }}>
          <Box sx={{ mr: 2 }}>
            <Avatar sx={{ bgcolor: grey[600] }}>
              <AssignmentIcon />
            </Avatar>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h4" gutterBottom>
                {assignment.name}
              </Typography>
              <VerticalMenu icon={<MoreVertIcon />} items={verticalMenuItems} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 2,
                borderBottom: "1px solid",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontSize: 14 }}
              >
                {assignment.author?.username} {bull} {createdAt}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                Due {closedAt}
              </Typography>
            </Box>
            <br />
            <Typography variant="subtitle2">
              {assignment.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ m: "auto" }}>
          <Submission
            assignmentId={assignment.id}
            dueDate={assignment.closedAt}
          />
        </Box>
      </Box>
    </AssignmentLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assignmentId = context.params?.assignmentId as string;
  const result = await getAssignmentById(assignmentId);
  const assignment = assignmentMapper(result);
  assignment.author = result.author;
  assignment.classroom = result.classroom;

  return {
    props: {
      assignment,
    },
  };
};
