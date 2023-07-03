export interface ComSciSubject {
  id: string;
  icon: string;
  subTitle: string;
  subjectName: string;

  iconPreview?: string;
}

export interface ComSciSubjectDetail {
  id?: string;
  icon: string;
  subTitle: string;
  subjectName: string;
  description: string;

  createdAt?: string;
  photos: Photo[];

  iconPreview?: string;
}

export interface Photo {
  id?: string;
  url: string;

  imagePreview?: string;
}

export interface ComSciSubjectCreate {
  icon: string;
  subTitle: string;
  subjectName: string;
  description: string;

  photos: Photo[]; 
}

export interface ComSciSubjectUpdate extends ComSciSubjectCreate {
  id: string;
}
