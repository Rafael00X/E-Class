import { createMeet } from "@/modules/fetch";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Meet } from "@prisma/client";
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
  description: "",
  url: "",
};

export default function CreateMeetForm(props: {
  classroomId: string;
  callback: (meet: Meet) => void;
}) {
  const [values, setValues] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMeet(values.description, values.url, props.classroomId).then(
      (data) => {
        props.callback(data.meet);
      }
    );
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        Create Classroom
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={values.description}
          onChange={handleChange}
          fullWidth
          required
        />
        <br />
        <TextField
          label="Url"
          variant="outlined"
          name="url"
          value={values.url}
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
