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
  consultants: Consultant[];
  student: Student;
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

export interface ProjectCreate {
  nameTH: string;
  nameEN: string;
  description: string;
  videoUrl: string;
  webUrl: string;
  githubUrl?: string;
  consultants: Consultant[];
  fileImage: FileList;
  filePDF: FileList;
}

export interface ProjectUpdate extends ProjectCreate {
  id: string;
}
