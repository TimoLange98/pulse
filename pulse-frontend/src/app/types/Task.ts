import { TaskLabel } from "./TaskLabel";
import { TaskStatus } from "./TaskStatus";
import { TrackableResource } from "./TrackableResource";

export type Task = {
  id: number;
  projectId: string;
  columnId: number;
  title: string;
  content: string;
  labels: TaskLabel[]
  status: TaskStatus;
  associatedUserIds: string[]
} & TrackableResource;
