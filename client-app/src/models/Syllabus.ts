export interface Syllabus {
  id: string;
  nameTH: string;
  nameEN: string;
  year: number;
  degreeTH: string;
  degreeEN: string;
  createdAt: Date;
  subjects: Subject[];
  total: number;
  avg: number;
}

export interface Subject {
  name: string;
  credit: number;
}

export interface SyllabusCreate {
  nameTH: string;
  nameEN: string;
  year: number;
  degreeTH: string;
  degreeEN: string;
  subjects: Subject[];
}

export interface SyllabusUpdate extends SyllabusCreate {
  id: string;
}
