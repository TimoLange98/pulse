import { TrackableResource } from './TrackableResource';

export type Column = {
  id: number;
  projectId: string;
  name: string;
  index: number;
} & TrackableResource;
