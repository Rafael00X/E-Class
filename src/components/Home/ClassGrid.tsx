import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Classroom } from "@/types/classroom";
import ClassPreviewCard from "./ClassPreviewCard";

type ClassGridProps = {
  classrooms: Classroom[];
};

export default function ClassGrid(props: ClassGridProps) {
  const { classrooms } = props;
  return (
    <Box sx={{ flexGrow: 1 }} p={5}>
      <Grid container spacing={5}>
        {classrooms.map((classroom, index) => {
          return (
            <Grid item xs={3}>
              <ClassPreviewCard classroom={classroom} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
