import LoginForm from "@/components/Signup/LoginForm";
import RegisterForm from "@/components/Signup/RegisterForm";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import { useState } from "react";

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <br />
      <Button type="hlt" onClick={() => setIsLogin((prev) => !prev)}>
        Swap
      </Button>
    </Card>
  );
};

export default SignupPage;
