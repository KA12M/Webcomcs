import { RcFile } from "antd/es/upload";
import { Profile } from "./User";

export interface News {
  id: string;
  title: string;
  subTitle?: string;
  isHidden: boolean;
  createdAt: Date;
  mainImage: string;
}

export class NewsDetail {
  id;
  title;
  subTitle;
  isHidden;
  createdAt;
  mainImage;

  body?: string | undefined;
  newsPhotos?: NewsPhoto[] | undefined;
  author?: Profile | undefined;

  constructor(news: News) {
    this.id = news.id;
    this.title = news.title;
    this.subTitle = news.subTitle;
    this.isHidden = news.isHidden;
    this.createdAt = news.createdAt;
    this.mainImage = news.mainImage;
  }
}

export interface NewsPhoto {
  id: string;
  url: string;
  isMain: boolean;
  createdAt: Date;

  previewURL: string;
}

export class NewsCreate {
  title: string = "";
  subTitle?: string | null;
  body: string = "";
  fileImages: RcFile[] | undefined;

  newsPhotos?: NewsPhoto[];
}

export class NewsUpdate extends NewsCreate {
  id: string | null = null;
}
