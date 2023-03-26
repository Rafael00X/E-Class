import AssignmentCard from "@/components/Classroom/AssignmentCard";
import HomeLayout from "@/components/Layout/HomeLayout";
import Select from "@/components/UI/Select";
import prisma from "@/database/prisma";
import { Assignment } from "@/types/assignment";
import { getDateDiff } from "@/utils/dateHelper";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";

type SubmitPageProps = {
  data: {
    id: string;
    name: string;
    assignments: (Assignment & {
      submissions: {
        student: {
          id: string;
          username: string;
        };
      }[];
    })[];
  }[];
};

// Add Layout

export default function SubmitPage(props: SubmitPageProps) {
  const { data } = props;
  const items = data.map((c) => {
    return { value: c.id, name: c.name };
  });
  items.unshift({ value: "", name: "All" });
  const [classroomId, setClassroomId] = useState("");
  const handleChange = (classroomId: string | number) => {
    if (typeof classroomId === "string") setClassroomId(classroomId);
  };

  let assignments: any[] = [];
  data.forEach(
    (classroom) => (assignments = assignments.concat(classroom.assignments))
  );
  assignments.sort((a, b) => getDateDiff(b.createdAt, a.createdAt));

  if (classroomId) {
    assignments = assignments.filter(
      (assignment) => assignment.classroomId === classroomId
    );
  }

  return (
    <HomeLayout>
      <Box>
        <Select
          label="Classroom"
          value={classroomId}
          callback={(v) => handleChange(v)}
          items={items}
        />
        <Box sx={{ mt: "40px" }}>
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </Box>
      </Box>
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.req.headers["user_id"] as string;
  const assignmentFilter = {
    include: {
      submissions: {
        select: {
          student: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  };

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      studentClassrooms: {
        select: {
          id: true,
          name: true,
          assignments: assignmentFilter,
        },
      },
    },
  });

  if (!result)
    return {
      props: {
        data: JSON.parse(JSON.stringify(result)),
      },
    };

  const data = result.studentClassrooms;

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};
