import { RcFile } from "antd/es/upload";
export interface Project {
  id: string;
  nameTH: string;
  nameEN: string;
  description: string;
  image: string;
  pdf: string;
  videoUrl: string;
  webUrl: string;
  githubUrl?: string;
  keyWords: string | null;
  consultants: Consultant[];
  student: Student;
  createdAt: Date;
  isUsed: boolean;

  imagePreview: string | null;
  keyWordList: string[] | null;
}

export interface Consultant {
  id?: string;
  lecturerName: string;
}

export interface Student {
  email: string;
  username: string;
  fullName: string;
  image?: string;
}

export class ProjectCreate {
  nameTH: string = "";
  nameEN: string = "";
  description: string = "";
  videoUrl: string = "";
  webUrl: string = "";
  githubUrl?: string = "";
  consultants: Consultant[] = [];
  fileImage: RcFile | null = null;
  filePDF: RcFile | null = null;
  keyWords: string = "";

  keyWordList: string[] = [];
}

export interface ProjectUpdate extends ProjectCreate {
  id: string;
}
