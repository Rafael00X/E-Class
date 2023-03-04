import { User } from "@/types/user";
import { GetServerSideProps } from "next";

type ParticipantsPageProps = {
  admin: User;
  teachers: User[];
  students: User[];
};

export default function ParticipantsPage(props: ParticipantsPageProps) {
  return <h1>Assignment Stream</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO
  const classroomId = context.params?.id as string;

  return {
    props: {},
  };
};
