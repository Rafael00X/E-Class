import { ChangeEvent, FormEvent, useState } from "react";
// import InputField from "../UI/InputField";
import { registerUser } from "@/modules/fetch";
import { useRouter } from "next/router";
import { Box, TextField, Button } from "@mui/material";
import { useUserContext } from "@/contexts/UserContext";

const RegisterForm = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const router = useRouter();
  const userContext = useUserContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setErrors({
        name: "",
        email: "",
        password: "Passwords must match",
        confirmPassword: "Passwords must match",
      });
      return;
    }
    registerUser(values.name, values.email, values.password)
      .then((data) => {
        userContext?.login(data.user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Email already registered") {
          setErrors({
            name: "",
            email: "Email already registered",
            password: "",
            confirmPassword: "",
          });
        }
      });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          name="name"
          value={values.name}
          onChange={handleChange}
          fullWidth
          required
          error={errors.name !== ""}
          helperText={errors.name}
        />
        <br />
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          error={errors.confirmPassword !== ""}
          helperText={errors.confirmPassword}
        />
        <br />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
