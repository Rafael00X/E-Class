import { useState } from "react";
import InputField from "../UI/InputField";
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
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(values.email, values.password)
      .then((data) => {
        console.log(data);
        router.push("/");
        // Save to context and local-storage / cookie
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
