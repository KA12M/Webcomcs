export interface JobHistory {
  id?: string;

  jobName: string;
  position: string;
  date: Date;
  company: string;
  description: string;
 
  user?: user;
  created?: Date;
  isUse?: boolean;
}

interface user {
  username: string;
  fullName: string;
  email: string;
  image: string | null;
}
