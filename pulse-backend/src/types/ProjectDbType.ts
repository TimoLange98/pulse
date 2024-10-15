import { TrackableResource } from "./TrackableResource";

export type ProjectDbType = {
  id: string;
  title: string;
  description?: string;
  deadline?: Date
  asociated_user_ids?: string[];
} & TrackableResource;