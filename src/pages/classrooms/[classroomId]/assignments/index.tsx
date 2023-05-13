import AssignmentCard from "@/components/Classroom/AssignmentCard";
import ClassroomLayout from "@/components/Layout/ClassroomLayout";
import Select from "@/components/UI/Select";
import { classroomRepository } from "@/database/";
import { assignmentMapper } from "@/types/assignment";
import { Classroom } from "@/types/classroom";
import { userPreviewMapper } from "@/types/user";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddAssignmentForm from "@/components/Form/AddAssignmentForm";
import Modal from "@/components/UI/Modal";
import { createAssignment } from "@/modules/fetch";
import { useUserContext } from "@/contexts/UserContext";

type AssignmentPageProps = {
  classroom: Classroom;
};

export default function AssignmentsPage(props: AssignmentPageProps) {
  const classroom = props.classroom;
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabIndex(newValue);

  const assignmentsWithTags: { [key: string]: React.ReactNode[] } = {};
  const assignmentsWithoutTags: React.ReactNode[] = [];
  classroom.assignments?.forEach((assignment) => {
    const tag = assignment.tag;
    if (!tag)
      assignmentsWithoutTags.push(
        <AssignmentCard key={assignment.id} assignment={assignment} />
      );
    else if (assignmentsWithTags[tag])
      assignmentsWithTags[tag].push(
        <AssignmentCard key={assignment.id} assignment={assignment} />
      );
    else
      assignmentsWithTags[tag] = [
        <AssignmentCard key={assignment.id} assignment={assignment} />,
      ];
  });

  const tags = ["All"].concat(Object.keys(assignmentsWithTags));
  const items = tags.map((tag, index) => {
    return { name: tag, value: index };
  });

  const allAssignments = (
    <>
      <div style={{ marginBottom: 60 }}>{assignmentsWithoutTags}</div>
      {Object.entries(assignmentsWithTags).map(([tag, assignments]) => {
        return (
          <div key={tag} style={{ marginBottom: 60 }}>
            <Typography
              variant="h4"
              borderBottom={"1px solid"}
              sx={{ mb: 5, pb: 3 }}
            >
              {tag}
            </Typography>
            {assignments}
          </div>
        );
      })}
    </>
  );

  const getAssignmentsOfTag = (tag: string) => {
    return (
      <div key={tag} style={{ marginBottom: 25 }}>
        <Typography
          variant="h4"
          borderBottom={"1px solid"}
          sx={{ mb: 5, pb: 3 }}
        >
          {tag}
        </Typography>
        {assignmentsWithTags[tag]}
      </div>
    );
  };

  return (
    <ClassroomLayout title={classroom.name} classroomId={classroom.id}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ mr: 5, mt: 9, display: { xs: "none", md: "block" } }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabIndex}
            onChange={handleChange}
            aria-label="Vertical tabs example"
          >
            {tags.map((tag, index) => (
              <Tab key={`vertical-tab-${index}`} label={tag} wrapped />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Box sx={{ display: { md: "none" }, mb: 5, mt: 1 }}>
            <Select
              label="Subject"
              value={tabIndex}
              items={items}
              callback={(v) => setTabIndex(v as number)}
            />
          </Box>
          {tabIndex === 0 && <CreateAssignment classroom={classroom} />}
          {tabIndex === 0 && allAssignments}
          {tabIndex !== 0 && getAssignmentsOfTag(tags[tabIndex])}
        </Box>
      </Box>
    </ClassroomLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;
  const userId = context.req.headers["user_id"] as string;
  const result = await classroomRepository.getClassroomById(
    classroomId,
    userId
  );
  const classroom: Classroom = {
    name: result.name,
    id: result.id,
    tags: result.tags,
    admin: userPreviewMapper(result.admin),
    students: result.students,
    assignments: result.assignments.map((a) => {
      const assignment = assignmentMapper(a);
      assignment.author = userPreviewMapper(a.author);
      return assignment;
    }),
  };

  return {
    props: {
      classroom,
    },
  };
};

function CreateAssignment(props: { classroom: Classroom }) {
  const { classroom } = props;
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserContext()?.user;

  if (user?.id !== classroom.admin?.id) return null;

  const handleAdd = (values: {
    name: string;
    desc: string;
    tag: string;
    closedAt: string;
  }) => {
    createAssignment(
      values.name,
      values.desc,
      values.tag,
      new Date(values.closedAt),
      classroom.id
    );
    setIsOpen(false);
  };
  const handleClick = () => setIsOpen(true);
  return (
    <div>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)}>
        <AddAssignmentForm callback={handleAdd} tags={classroom.tags} />
      </Modal>
      <div>
        <Button variant="contained" sx={{ mb: "30px" }} onClick={handleClick}>
          Create <AddIcon />
        </Button>
      </div>
    </div>
  );
}
