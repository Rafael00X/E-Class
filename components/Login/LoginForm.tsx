import { useState } from "react";
import InputField from "../UI/InputField";

const URL = "http://localhost:3000/api/login";

const LoginForm = () => {
  const initialState = {
    email: "",
    password: "",
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
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ email: values.email, password: values.password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setErrors({
          email: "Invalid credentials",
          password: "Invalid credentials",
        });
      });
  };
  return (
    <form onSubmit={onSubmit}>
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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
