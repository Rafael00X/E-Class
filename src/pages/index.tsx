import ClassGrid from "@/components/Home/ClassGrid";
import { userRepository } from "@/database";
import { User } from "@/types/user";
import Box from "@mui/material/Box";
import { GetServerSideProps } from "next";
import HomeLayout from "@/components/Layout/HomeLayout";

type HomeProps = {
  user: User;
};

export default function HomePage(props: HomeProps) {
  const user = props.user;
  return (
    <HomeLayout>
      <Box sx={{ display: "flex" }}>
        <Box p={2} sx={{ width: "100%" }}>
          {user.classrooms && <ClassGrid classrooms={user.classrooms} />}
        </Box>
      </Box>
    </HomeLayout>
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
    createdAt: fetchedUser.createdAt.toISOString(),
    classrooms: [
      ...fetchedUser.adminClassrooms,
      ...fetchedUser.teacherClassrooms,
      ...fetchedUser.studentClassrooms,
    ],
  };

  return {
    props: {
      user,
    },
  };
};
