import ClassGrid from "@/components/Home/ClassGrid";
import ClassPreviewCard from "@/components/Home/ClassPreviewCard";
import Button from "@/components/UI/Button";
import { ThemeContext } from "@/contexts/Theme";
import { userRepository } from "@/database";
import { User } from "@/types/user";
import { GetServerSideProps } from "next";
import { useContext } from "react";

type HomeProps = {
  user: User;
};

export default function HomePage(props: HomeProps) {
  const user = props.user;
  console.log(props.user);
  const context = useContext(ThemeContext);
  const handleClick = () => context?.swapTheme();
  return (
    <div>
      {user.classrooms && <ClassGrid classrooms={user.classrooms} />}
      <Button onClick={handleClick}>Click Me</Button>
      <Button onClick={handleClick} type="hlt">
        Click Me
      </Button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.req.headers["user_id"];
  if (!userId || typeof userId !== "string")
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };

  const fetchedUser = await userRepository.getUserById(userId);
  const user: User = {
    id: fetchedUser.id,
    username: fetchedUser.username,
    email: fetchedUser.email,
    classrooms: fetchedUser.classrooms,
  };

  return {
    props: {
      user,
    },
  };
};
