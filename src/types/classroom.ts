import { UserPreview } from "./user";

export type Classroom = {
  id: string;
  name: string;
  students?: UserPreview[];
};
