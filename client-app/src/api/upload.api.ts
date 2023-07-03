import { req } from "./agent";
import { RcFile } from "antd/es/upload";

export const Uploads = {
  image: (data: RcFile) => {
    let formData = new FormData();
    formData.append("images", data);
    req.postForm(`/uploadFile`, formData);
  },
};
