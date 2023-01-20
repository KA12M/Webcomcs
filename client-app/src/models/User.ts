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

export class Profile {
  email: string = "";
  username: string = "";
  fullName: string = "";
  bio?: string = "";
  image?: string | null;
  isRole: any;

  student?: Student | null;
  lecturer?: Lecturer | null;
}  

export interface Student {
  oldEdu?: string;
  Address?: string;
}

export interface Lecturer {
  Expert?: string;
  LvEdu?: string;
  Program?: string;
  Position?: string;
  Contact?: string;
}

export interface UpdateMe {
  FullName: string;
  Bio?: string;
  Files?: File[];
}
