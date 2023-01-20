export interface Lecturer {
  id: string;
  fullName: string;
  position: string;
  image?: string;
  prefixed: string;
}

export interface LecturerCreate {
  fullName: string;
  position: string;
  prefixed: string;
  fileImage: FileList;
}

export interface LecturerUpdate extends LecturerCreate {
  id: string;
}
