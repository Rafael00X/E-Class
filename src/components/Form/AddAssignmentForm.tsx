import { Box, Typography, TextField, Button } from "@mui/material";
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

const initialState = {
  name: "",
  desc: "",
  closedAt: "",
};

export default function AddAssignmentForm(props: {
  callback: (values: typeof initialState) => void;
}) {
  const [values, setValues] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.callback(values);
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
          Add
        </Button>
      </form>
    </Box>
  );
}
