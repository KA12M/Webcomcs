import { RcFile } from "antd/es/upload";

export interface Lecturer {
  id: string;
  fullName: string;
  position: string;
  image?: string | null;
  prefix: string;
  expert?: string;
  hidden: boolean;

  imagePreview?: string;
}

export interface LecturerCreate {
  fullName: string;
  position: string;
  prefix: string;
  expert?: string;
  
  fileImage: RcFile;
}

export interface LecturerUpdate extends LecturerCreate {
  id: string;
}
