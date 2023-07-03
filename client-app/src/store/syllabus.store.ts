import { makeAutoObservable, runInAction } from "mobx";
import {
  SubjectCreate,
  Syllabus,
  SyllabusCreate,
  SyllabusDetail,
} from "./../models/Syllabus";
import agent from "../api/agent";
import { Subject } from "../models/Syllabus";
import { URLFile } from "../utils/URL";

const objSubject: any = {
  0: "subjectGeneral",
  1: "subjectSpecific",
  2: "subjectFreeElective",
};

export default class SyllabusStore {
  syllabusRegistry = new Map<string, Syllabus>();
  syllabusSelected: Syllabus | null = null;
  tableBody: any[] = [];
  yearList: any[] = [];
  formBody: any = {}

  predicate = new Map<string, any>().set("showHidden", false);
  loading = false;
  submittingLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private SyllabusSumCredit = (data: Subject[]) =>
    data.reduce((acc, currentValue) => acc + currentValue.credit, 0);

  private get axiosParams() {
    let params = new URLSearchParams();
    this.predicate.forEach((value, key) => params.append(key, value));
    return params;
  }

  private setSyllabus = (data: any) => {
    data.yearFormat = String(Number(data.year) + 543);
    data.pdfPreview = URLFile(data.pdf);
    Array.from({ length: 3 }).forEach((_, i) => {
      data[`${objSubject[i]}Sum`] = this.SyllabusSumCredit(data[objSubject[i]]);
    });
    this.syllabusRegistry.set(data.id, data);
  };

  setFormBody = (temp: {}) =>
    (this.formBody = Object.assign(this.formBody, temp));

  syllabusList = () => Array.from(this.syllabusRegistry.values());

  setYearList = () => {
    let list = [...new Set(this.syllabusList().map((a) => a.yearFormat))];
    list = list
      .sort((a: any, b: any) => parseInt(b) - parseInt(a))
      .map((num) => String(num));
    this.yearList = list;
    return list;
  };

  getSyllabusByYear = (year: string) => {
    let syllabus = this.syllabusList().find(
      (a: Syllabus) => a.yearFormat == year
    )!;
    this.syllabusSelected = syllabus;
  };

  setTable = (temp: any) => (this.tableBody = temp); 

  loadSyllabuses = async () => {
    this.loading = true;
    try {
      let response = await agent.Syllabuses.list(this.axiosParams);
      runInAction(() => {
        response.forEach(this.setSyllabus);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  loadSyllabusDetail = async (id: string) => {
    this.loading = true;
    try {
      let res = await agent.Syllabuses.getOne(id);
      runInAction(() => {
        res.yearPreview = res.year; 
        res.year = "";
        this.formBody = res;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      throw error;
    }
  };

  createSyllabus = async () => {
    this.submittingLoading = true;
    try {
      await agent.Syllabuses.add(this.formBody);
      runInAction(() => {
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  editSyllabus = async () => {
    this.submittingLoading = true;
    try {
      await agent.Syllabuses.edit(this.formBody);
      runInAction(() => {
        this.submittingLoading = false;
      });
    } catch (error) {
      runInAction(() => (this.submittingLoading = false));
      throw error;
    }
  };

  clearFormBody = () => (this.formBody = {});

  deleteSyllabus = async (id: string) => {
    this.loading = true;
    try {
      await agent.Syllabuses.delete(id);
      runInAction(() => {
        this.syllabusRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      return error;
    }
  };

  hidden = async (data: Syllabus) => {
    this.loading = true;
    try {
      let currentSyllabus = this.syllabusRegistry.get(data.id);
      await agent.Syllabuses.hidden(data.id);
      runInAction(() => {
        this.syllabusRegistry.set(
          data.id,
          Object.assign(currentSyllabus!, {
            hidden: !currentSyllabus?.hidden,
          })
        );
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      return error;
    }
  };
}
