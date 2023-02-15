import LoginForm from "@/components/Signup/LoginForm";
import RegisterForm from "@/components/Signup/RegisterForm";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import { validateUser } from "@/modules/client/fetch";
import { useState } from "react";

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const validate = () =>
    validateUser()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => alert(err));

  return (
    <Card>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <br />
      <Button type="hlt" onClick={() => setIsLogin((prev) => !prev)}>
        Swap
      </Button>
      <Button type="hlt" onClick={validate}>
        Validate
      </Button>
    </Card>
  );
};

export default SignupPage;
