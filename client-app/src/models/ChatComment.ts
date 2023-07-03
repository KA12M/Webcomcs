import { Profile } from "./User";

export interface ChatComment {
  id: string;
  createdAt: string;
  body: string;
  author: Profile;
}
