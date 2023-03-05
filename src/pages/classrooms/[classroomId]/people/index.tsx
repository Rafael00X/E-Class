import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import prisma from "@/database/prisma";
import PersonCard from "@/components/Classroom/PersonCard";
import ClassroomLayout from "@/components/Layout/ClassroomLayout";

type PeoplePageProps = {
  classroom: {
    id: string;
    name: string;
    admin: {
      id: string;
      username: string;
    };
    teachers: {
      id: string;
      username: string;
    }[];
    students: {
      id: string;
      username: string;
    }[];
  };
};

export default function PeoplePage(props: PeoplePageProps) {
  const classroom = props.classroom;
  const students = classroom.students;
  const teachers = [classroom.admin, ...classroom.teachers];

  return (
    <ClassroomLayout title={classroom.name} classroomId={classroom.id}>
      <Typography variant="h4">Teachers</Typography>
      {teachers.map((teacher) => (
        <PersonCard key={teacher.id} user={teacher} />
      ))}
      <br />
      <Typography variant="h4">Students</Typography>
      {students.map((student) => (
        <PersonCard key={student.id} user={student} />
      ))}
    </ClassroomLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;

  const userSelectFilter = {
    id: true,
    username: true,
  };

  const data = await prisma.classroom.findUniqueOrThrow({
    where: {
      id: classroomId,
    },
    select: {
      id: true,
      name: true,
      admin: {
        select: userSelectFilter,
      },
      teachers: {
        select: userSelectFilter,
      },
      students: {
        select: userSelectFilter,
      },
    },
  });

  return {
    props: {
      classroom: data,
    },
  };
};
