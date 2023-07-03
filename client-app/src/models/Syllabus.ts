import { RcFile } from "antd/es/upload";

export interface Syllabus {
  id: string;
  nameTH: string;
  nameEN: string;
  year: string;
  degreeTH: string;
  degreeEN: string;
  pdf: string;
  subjectGeneral: Subject[];
  subjectSpecific: Subject[];
  subjectFreeElective: Subject[];
  objective: string[];
  occupation: string[];
  createdAt: Date;
  hidden: boolean;
  total: number;
  avg: number;

  subjectGeneralSum?: number;
  subjectSpecificSum?: number;
  subjectFreeElectiveSum?: number;
  pdfPreview?: string;
  yearFormat?: string;
}

export interface SubjectCreate {
  name: string;
  credit: number;
}

export interface Subject extends SubjectCreate {
  id?: string;
  subjectCategory: number;
}

export interface SyllabusCreate {
  nameTH: string;
  nameEN: string;
  year: string;
  pdf: string;
  degreeTH: string;
  degreeEN: string;
  subjects: SubjectCreate[];
  objective: any[];
  occupation: any[]; 

  subjectGeneral: Subject[];
  subjectSpecific: Subject[];
  subjectFreeElective: Subject[];
}

export interface SyllabusDetail {
  id: string;
  nameTH: string;
  nameEN: string;
  year: string;
  degreeTH: string;
  degreeEN: string;
  pdf: string;
  subjectGeneral: Subject[];
  subjectSpecific: Subject[];
  subjectFreeElective: Subject[];
  objective: Obj[];
  occupation: Obj[];
  hidden: boolean;

  yearPreview?: string;
}

interface Obj {
  id: string;
  sentence: string;
}
