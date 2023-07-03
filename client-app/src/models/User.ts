import { RcFile } from "antd/es/upload";
import { JobHistory } from "./JobHistory";

export interface User {
  token: string;
  username: string;
  fullName: string;
  image?: string | null;
  roles?: string[] | null;
}
export interface LoginDTO {
  email: string;
  password: string;
}

export interface registerDTO {
  fullName: string;
  email: string;
  password: string;

  username?: string | null;
  role?: string | null;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPasswords: string;
}

export class Profile {
  email: string = "";
  username: string = "";
  fullName: string = "";
  bio?: string = "";
  image?: string | undefined;
  isRole: any;

  isMe: boolean = false;
  imagePreview?: string | undefined;

  student?: Student | undefined = {};
  lecturer?: Lecturer | undefined = {};
  jobHistory?: JobHistory | null = null;
}

export interface Student {
  yearEdu?: string;
  oldEdu?: string;
  address?: string;
}

export interface Lecturer {
  expert?: string;
  lvEdu?: string;
  program?: string;
  position?: string;
  contact?: string;
}

export interface UpdateMe {
  fullName: string;
  bio?: string;

  student?: Student;
  lecturer?: Lecturer;
  fileImages?: RcFile | undefined;
}
