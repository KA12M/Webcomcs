import { RcFile } from "antd/es/upload";

export interface Setting {
  webName: string;
  registerUrl: string;
  kruUrl: string;
  logo: string | null;
  videoUrl: string | null;
  pageFacebook: string | null;
  location: string;

  youtubeList: string[] | undefined;
  logoPreview: string | undefined;
  fileImages?: RcFile | undefined;

  latAndLng: LatLng; 
}

interface LatLng {
  lat: any;
  lng: any
}
