import { Box, FormControl, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
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

export default function JoinClassroomForm(props: { callback?: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length !== 12) {
      return setError("Classroom Id must be 12 digits");
    }
    setError("");

    fetch("/api/classroom?task=enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classroomId: value,
      }),
    }).then((res) => {
      if (props.callback) props.callback();
    });
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 2 }}>
        Join Classroom
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="classroom-id"
          label="Classroom Id"
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
          Join
        </Button>
      </form>
    </Box>
  );
}
