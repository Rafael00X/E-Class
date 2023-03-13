import { Card, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import {
  createSubmission,
  deleteSubmission,
  getSubmission,
} from "@/modules/client/fetch";

export default function Submission(props: {
  assignmentId: string;
  dueDate: string | null;
}) {
  const { assignmentId, dueDate } = props;
  const [values, setValues] = useState<string[]>([]);
  const [submission, setSubmission] = useState<any>(null);
  const isMissing = !!dueDate && new Date(dueDate) > new Date() && !submission;
  const isDue = !!dueDate && new Date(dueDate) < new Date() && !submission;
  const isDone = !!submission;
  useEffect(() => {
    getSubmission(assignmentId)
      .then((res) => {
        setSubmission(res.submission);
        setValues(res.submission.work);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    createSubmission(submission.work, assignmentId)
      .then((res) => {
        setSubmission(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleUnsubmit = () => {
    deleteSubmission(assignmentId)
      .then((res) => {
        setSubmission(null);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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
        {isDone && (
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
      {values.length === 0 && (
        <Typography
          color="text.secondary"
          variant="subtitle2"
          sx={{ textAlign: "center" }}
        >
          No work submitted
        </Typography>
      )}
      {values.length !== 0 &&
        values.map((value, index) => <WorkCard key={index} work={value} />)}
      <br />
      <Button fullWidth variant="outlined">
        <AddIcon fontSize="small" /> Add file
      </Button>
      <br />
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

function WorkCard(props: { work: string }) {
  return (
    <Card elevation={0} sx={{ overflow: "hidden", p: 1 }}>
      <Typography noWrap>{props.work}</Typography>
    </Card>
  );
}

// function SubmitButton(props: { callback: () => void }) {
//   return (
//     <Button fullWidth variant="contained" onClick={() => props.callback()}>
//       Submit
//     </Button>
//   );
// }

// function UnsubmitButton(props: { callback: () => void }) {
//   return (
//     <Button fullWidth variant="contained" onClick={() => props.callback()}>
//       Unsubmit
//     </Button>
//   );
// }
