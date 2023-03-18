import { Assignment } from "@/types/assignment";
import { Box, Typography, TextField, Button } from "@mui/material";
import moment from "moment";
import { ChangeEvent, FormEvent, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function EditAssignmentForm(props: {
  assignment: Assignment;
  callback: (values: typeof initialState) => void;
}) {
  const { assignment, callback } = props;
  const initialState = {
    name: assignment.name,
    desc: assignment.description,
    tag: assignment.tag,
    closedAt: moment(assignment.closedAt, moment.ISO_8601).format(
      moment.HTML5_FMT.DATETIME_LOCAL
    ),
  };
  const [values, setValues] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback({ ...values, closedAt: moment(values.closedAt).format() });
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        Create Assignment
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          name="name"
          value={values.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <br />
        <TextField
          label="Instruction"
          variant="outlined"
          name="desc"
          value={values.desc}
          onChange={handleChange}
          fullWidth
          required
        />
        <br />
        <TextField
          type="datetime-local"
          label="Closed At"
          variant="outlined"
          name="closedAt"
          value={values.closedAt}
          onChange={handleChange}
          fullWidth
          required
        />
        <br />
        <TextField
          label="Tag"
          variant="outlined"
          name="tag"
          value={values.tag}
          onChange={handleChange}
          fullWidth
        />
        <br />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
          Edit
        </Button>
      </form>
    </Box>
  );
}
