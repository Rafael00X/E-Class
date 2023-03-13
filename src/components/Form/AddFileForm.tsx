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

export default function AddClassroomForm(props: {
  callback: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.callback(value);
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        Create Classroom
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="File Name"
          variant="outlined"
          value={value}
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
