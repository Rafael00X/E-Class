import { ChangeEvent, FormEvent, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { loginUser } from "@/modules/fetch";
import { useRouter } from "next/router";

const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(values.email, values.password)
      .then((data) => {
        console.log(data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Invalid credentials") {
          setErrors({
            email: "Invalid credentials",
            password: "Invalid credentials",
          });
        }
        if (err.message === "Email not registered") {
          setErrors({
            email: "Email not regestered",
            password: "",
          });
        }
      });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={values.email}
          onChange={handleChange}
          fullWidth
          required
          error={errors.email !== ""}
          helperText={errors.email}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={values.password}
          onChange={handleChange}
          fullWidth
          required
          error={errors.password !== ""}
          helperText={errors.password}
        />
        <br />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
