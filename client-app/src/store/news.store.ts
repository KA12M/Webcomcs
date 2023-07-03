import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import URLImage from "../utils/URL";
import { Pagination, PagingParams } from "../models/Pagination";
import { News, NewsCreate, NewsDetail, NewsPhoto } from "../models/News";

class NewsSTore {
  newsRegistry = new Map<string, News>();
  newsSelected: NewsDetail | undefined = undefined;

  formBody: NewsCreate = new NewsCreate();
  tableBody: any[] = [];

  pagination: Pagination | null = null;
  pagingParams: PagingParams = new PagingParams(1, 8);
  predicate = new Map().set("ShowAll", false);
  loading: boolean = false;
  submitLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTable = (temp: any[]) => (this.tableBody = temp);
  setSearch = (word: string) => this.predicate.set("Search", word);
  setPagination = (pagination: Pagination) => (this.pagination = pagination);
  setPagingParams = (page: number, pageSize: number) => {
    this.pagingParams = { currentPage: page, pageSize };
    this.setPagination({
      ...this.pagination!,
      currentPage: page,
    });
  };

  private get axiosParams() {
    const params = new URLSearchParams();
    params.append("currentPage", this.pagingParams.currentPage.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  loadNewses = async () => {
    this.loading = true;
    try {
      var res = await agent.Newses.list(this.axiosParams);
      runInAction(() => {
        this.newsRegistry.clear();
        res.data.forEach(this.setNews);
        this.setPagination(res.pagination);
        this.stopLoading();
      });
    } catch (error) {
      runInAction(this.stopLoading);
      throw error;
    }
  };

  loadNews = async (id: string) => {
    this.loading = true;
    try {
      var response = await agent.Newses.getOne(id);
      runInAction(() => {
        this.newsSelected = new NewsDetail(response);
        this.newsSelected.body = response.body;
        this.newsSelected.author = response.author;
        this.newsSelected.newsPhotos = this.setNewsPhotos(response.newsPhotos!);
        this.stopLoading();
      });
    } catch (error) {
      runInAction(this.stopLoading);
      throw error;
    }
  };

  private setNews = (news: News) => {
    news.mainImage = news.mainImage && URLImage(news.mainImage);
    this.newsRegistry.set(news.id, news);
  };

  setNewsPhotos = (photos: NewsPhoto[]) => {
    return photos.map((photo) => {
      photo.previewURL = URLImage(photo.url);
      return photo;
    });
  };

  stopLoading = () => (this.loading = false);

  clearSelectNews = () => (this.newsSelected = undefined);
  clearFormBody = () => (this.formBody = new NewsCreate());

  addNews = async () => {
    if (!this.formBody.fileImages || this.formBody.fileImages.length < 1)
      throw "กรุณาอัพโหลดรูปภาพประกอบ";
    this.submitLoading = true;
    try {
      await agent.Newses.create(this.formBody);
      runInAction(() => {
        this.clearFormBody();
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  editNews = async (id: string) => {
    this.submitLoading = true;
    try {
      await agent.Newses.edit(Object.assign(this.formBody!, { id }));
      runInAction(() => {
        this.clearFormBody();
        this.clearSelectNews();
        this.submitLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submitLoading = false));
      throw error;
    }
  };

  hidden = async (news: News) => {
    try {
      await agent.Newses.hidden(news.id);
      runInAction(() => {
        this.newsRegistry.set(news.id, {
          ...news!,
          isHidden: !news.isHidden,
        });
      });
    } catch (error) {
      throw error;
    }
  };

  deleteNews = async (id: string) => {
    this.loading = true;
    try {
      await agent.Newses.delete(id);
      runInAction(() => {
        this.newsRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  setEditCurrentNews = () =>
    (this.formBody = Object.assign({}, this.formBody, this.newsSelected));

  setFormBody = (data: {}) =>
    (this.formBody = Object.assign({}, this.formBody, data));

  deletePhotoNews = async (id: string) => {
    this.loading = true;
    try {
      await agent.Newses.deletePhoto(id);
      runInAction(() => {
        this.formBody.newsPhotos = this.formBody.newsPhotos?.filter(
          (a) => a.id != id
        );
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };
}

export default NewsSTore;
