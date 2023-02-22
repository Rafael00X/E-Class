import AssignmentsPreviewCard from "@/components/Home/AssignmentsPreviewCard";
import RoutinePreviewCard from "@/components/Home/RoutinePreviewCard";
import ClassGrid from "@/components/Home/ClassGrid";
import { userRepository } from "@/database";
import { User } from "@/types/user";
import Box from "@mui/material/Box";
import { GetServerSideProps } from "next";
import useMediaQuery from "@mui/material/useMediaQuery";

type HomeProps = {
  user: User;
};

export default function HomePage(props: HomeProps) {
  const user = props.user;
  const isMedium = useMediaQuery("(min-width:900px)");
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box p={2} sx={{ width: "100%" }}>
          {user.classrooms && <ClassGrid classrooms={user.classrooms} />}
        </Box>
        {isMedium && (
          <Box p={2} pt={0} borderLeft="1px solid #bbb" mt={2}>
            <AssignmentsPreviewCard />
            <RoutinePreviewCard />
          </Box>
        )}
      </Box>
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
