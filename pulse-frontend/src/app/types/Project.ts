import { TrackableResource } from "./TrackableResource";

export type Project = {
  id: number;
  associatedUserIds: string[];
  title: string;
  description: string;
  progress: number;
  tasksCompleted: number;
  tasksOpen: number;
  deadline: Date;
} & TrackableResource;
