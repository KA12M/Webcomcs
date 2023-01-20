import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

export interface HomePhoto {
  id: string;
  title: string; 
  url: string;
  isEnable: boolean;
}

export interface HomePhotoCreate {
  title: string; 
  fileImage: RcFile[];
}

export interface HomePhotoUpdate extends HomePhotoCreate {
  id: string;
}

export class PhotoCreate {
  title: string = ""; 
  fileImage: RcFile | undefined = undefined;
}
