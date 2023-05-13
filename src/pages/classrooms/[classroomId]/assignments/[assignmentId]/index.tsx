import { GetServerSideProps } from "next";
import { Assignment, assignmentMapper } from "@/types/assignment";
import { getAssignmentById } from "@/database/repositories/assignment";
import AssignmentLayout from "@/components/Layout/AssignmentLayout";
import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";
import VerticalMenu from "@/components/UI/VerticalMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { grey } from "@mui/material/colors";
import SubmissionCard from "@/components/Assignment/SubmissionCard";
import { useRouter } from "next/router";
import { deleteAssignment, editAssignment } from "@/modules/fetch";
import { useState } from "react";
import EditAssignmentForm from "@/components/Form/EditAssignmentForm";
import Modal from "@/components/UI/Modal";

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
  const [assignment, setAssignment] = useState(props.assignment);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const createdAt = moment(assignment.createdAt).format("MMM D");
  const closedAt = assignment.closedAt
    ? moment(assignment.closedAt).format("MMM D")
    : undefined;
  const link = `/classrooms/${assignment.classroomId}/assignments/${assignment.id}`;
  const assignmentLink = `/classrooms/${assignment.classroomId}/assignments`;

  const handleCopyLink = () => {
    const url = window.location.origin + link;
    navigator.clipboard.writeText(url);
  };
  const handleEdit = (values: {
    name: string;
    desc: string;
    tag: string | null;
    closedAt: string | null;
  }) => {
    const date = values.closedAt ? new Date(values.closedAt) : null;
    editAssignment(values.name, values.desc, values.tag, date, assignment.id)
      .then((res) =>
        setAssignment((p) => {
          return { ...p, ...res.editedAssignment };
        })
      )
      .catch((err) => console.log(err));
    setIsOpen(false);
  };
  const handleDelete = () => {
    deleteAssignment(assignment.id)
      .then((res) => router.push(assignmentLink))
      .catch((err) => console.log(err));
  };

  const verticalMenuItems = [
    { text: "Copy Link", onClick: handleCopyLink },
    { text: "Edit", onClick: () => setIsOpen(true) },
    { text: "Delete", onClick: handleDelete },
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
        <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
          <EditAssignmentForm assignment={assignment} callback={handleEdit} />
        </Modal>
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
          <SubmissionCard
            assignmentId={assignment.id}
            dueDate={assignment.closedAt}
            authorId={assignment.author!.id}
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
