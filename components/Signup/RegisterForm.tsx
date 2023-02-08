import { useState } from "react";
import InputField from "../UI/InputField";
import { registerUser } from "@/fetch";

const RegisterForm = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        console.log(data);
        // Save to context and local-storage / cookie
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
    <form onSubmit={onSubmit}>
      <InputField
        label="Name"
        name="name"
        type="text"
        value={values.name}
        error={errors.name}
        onChange={onChange}
      />
      <InputField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={onChange}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        error={errors.password}
        onChange={onChange}
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChange={onChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default RegisterForm;
