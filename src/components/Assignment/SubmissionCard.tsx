import { Card, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import {
  createSubmission,
  deleteSubmission,
  getSubmission,
} from "@/modules/fetch";
import Modal from "../UI/Modal";
import AddFileForm from "../Form/AddFileForm";
import IconButton from "@mui/material/IconButton";
import { useUserContext } from "@/contexts/UserContext";

export default function SubmissionCard(props: {
  assignmentId: string;
  dueDate: string | null;
  authorId: string;
}) {
  const { assignmentId, dueDate, authorId } = props;
  const [values, setValues] = useState<string[]>([]);
  const [submission, setSubmission] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserContext()?.user;

  const isMissing = !!dueDate && new Date(dueDate) < new Date() && !submission;
  const isSubmitted = !!submission;

  useEffect(() => {
    getSubmission(assignmentId)
      .then((res) => {
        if (!res.submission) return;
        setSubmission(res.submission);
        setValues(res.submission.work);
      })
      .catch((err) => console.log(err));
  }, [assignmentId]);

  if (user?.id === authorId) return null;

  const handleAdd = (work: string) => {
    setValues((p) => [...p, work]);
    setIsOpen(false);
  };

  const handleRemove = (value: string) => {
    setValues((p) => p.filter((w) => w !== value));
  };

  const handleSubmit = () => {
    createSubmission(values, assignmentId)
      .then((res) => {
        setSubmission(res.submission);
      })
      .catch((err) => console.log(err));
  };

  const handleUnsubmit = () => {
    deleteSubmission(submission.id)
      .then((res) => {
        setSubmission(null);
      })
      .catch((err) => console.log(err));
  };

  const work =
    values.length !== 0 ? (
      values.map((value) => (
        <WorkCard
          key={value}
          work={value}
          isEditable={!submission}
          handleRemove={handleRemove}
        />
      ))
    ) : (
      <Typography
        color="text.secondary"
        variant="subtitle2"
        sx={{ textAlign: "center" }}
      >
        No work submitted
      </Typography>
    );

  return (
    <Card
      sx={{
        width: { sm: "100%", md: "300px" },
        p: 3,
        boxShadow: 4,
        ml: { sm: "auto", md: "30px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Your work</Typography>
        {isSubmitted && (
          <Typography variant="caption" color="forestgreen">
            Turned In
          </Typography>
        )}
        {isMissing && (
          <Typography variant="caption" color="red">
            Missing
          </Typography>
        )}
      </Box>
      <br />
      {work}
      <br />
      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <AddFileForm callback={handleAdd} />
      </Modal>
      {!isSubmitted && (
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setIsOpen(true)}
          sx={{ mb: 1 }}
        >
          <AddIcon fontSize="small" /> Add file
        </Button>
      )}
      <br />
      <Button
        fullWidth
        variant="contained"
        onClick={!submission ? handleSubmit : handleUnsubmit}
      >
        {!submission ? "Submit" : "Unsubmit"}
      </Button>
    </Card>
  );
}

function WorkCard(props: {
  work: string;
  isEditable: boolean;
  handleRemove: (value: string) => void;
}) {
  const { work, isEditable, handleRemove } = props;
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        p: 1,
      }}
    >
      <Typography noWrap>{work}</Typography>
      {isEditable && (
        <IconButton onClick={() => handleRemove(work)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Card>
  );
}
