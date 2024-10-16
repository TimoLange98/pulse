import { Task } from './Task';
import { TrackableResource } from './TrackableResource';

export type ProjectColumn = {
  id: number;
  projectId: string;
  name: string;
  index: number;
  tasks: Task[]
} & TrackableResource;
