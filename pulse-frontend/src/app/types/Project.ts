import { TaskLabel } from "./TaskLabel";
import { TrackableResource } from "./TrackableResource";

export type Project = {
  id: string;
  associatedUserIds: string[];
  title: string;
  description: string;
  progress: number;
  tasksCompleted: number;
  tasksOpen: number;
  deadline: Date;
  labels: TaskLabel[];
} & TrackableResource;
