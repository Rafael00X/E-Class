import LoginForm from "@/components/Signup/LoginForm";
import RegisterForm from "@/components/Signup/RegisterForm";
import { Button, Card } from "@mui/material";
import { useState } from "react";

const style = {
  display: "flex",
  flexDirection: "column",
  padding: "30px",
  width: "500px",
  margin: "auto",
  marginTop: "100px",
};

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card sx={style}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <br />
      {isLogin && (
        <p>
          Don&apos;t have an account?{" "}
          <Button onClick={() => setIsLogin(false)}>Register</Button>
        </p>
      )}
      {!isLogin && (
        <p>
          Already have an account?{" "}
          <Button onClick={() => setIsLogin(true)}>Login</Button>
        </p>
      )}
    </Card>
  );
};

export default SignupPage;
