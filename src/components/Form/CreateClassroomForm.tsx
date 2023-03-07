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

export default function AddClassroomForm(props: { callback?: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return setError("Name cannot be empty");
    }
    setError("");

    fetch("/api/classroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: value,
      }),
    }).then((res) => {
      if (props.callback) props.callback();
    });
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        Create Classroom
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="classroom-name"
          label="Classroom Name"
          variant="outlined"
          value={value}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          fullWidth
          required
        />
        <br />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
          Create
        </Button>
      </form>
    </Box>
  );
}
