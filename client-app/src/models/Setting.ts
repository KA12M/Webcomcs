import { RcFile } from "antd/es/upload";
export interface Setting {
  registerUrl: string;
  kruUrl: string;
  logo: string | null;

  logoPreview: string | undefined;
  fileImages?: RcFile | undefined;
}
