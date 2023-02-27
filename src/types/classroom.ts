import { Assignment } from "./assignment";
import { UserPreview } from "./user";

export type Classroom = {
  id: string;
  name: string;
  students?: UserPreview[];
  assignments?: Assignment[];
};
