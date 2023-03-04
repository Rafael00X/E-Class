import { Assignment } from "@/types/assignment";

type AssignmentStreamPageProps = {
  assignments: Assignment[];
};

export default function AssignmentStreamPage(props: AssignmentStreamPageProps) {
  return <h1>Assignment Stream</h1>;
}
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO

  return {
    props: {
      classroom,
    },
  };
};
*/
