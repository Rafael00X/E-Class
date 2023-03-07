import AssignmentsPreviewCard from "@/components/Home/AssignmentsPreviewCard";
import RoutinePreviewCard from "@/components/Home/RoutinePreviewCard";
import ClassGrid from "@/components/Home/ClassGrid";
import { userRepository } from "@/database";
import { User } from "@/types/user";
import Box from "@mui/material/Box";
import { GetServerSideProps } from "next";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeLayout from "@/components/Layout/HomeLayout";

type HomeProps = {
  user: User;
};

export default function HomePage(props: HomeProps) {
  const user = props.user;
  const isMedium = useMediaQuery("(min-width:900px)");
  return (
    <HomeLayout>
      <Box sx={{ display: "flex" }}>
        {isMedium && (
          <Box p={2} mr={3}>
            <AssignmentsPreviewCard />
            <RoutinePreviewCard />
          </Box>
        )}
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
