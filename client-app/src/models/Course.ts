export interface GenerationList extends Generation {
  course: Course; 
}

export interface Generation {
  id: string;
  subTitle: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  genPhoto: string;
  isCancelled: boolean;
  attendeeCount: number;

  description?: string;
  attendees?: Attendee[];
  previewAttendees?: Attendee[];
}

interface User {
  username: string;
  fullName: string;
  email: string;
  image: string | null;
}

export interface CourseList extends Course {
  forEach(setCourse: (data: CourseList) => void): unknown;
  isUsed: boolean;

  lecturer: User;
  generations: Generation[];
}

export interface Course {
  id: string;
  title: string;
  image: string | null;

  lecturer?: User;
}

export interface GenerationDetailDTO {
  id: string;
  title: string;
  image: string | null;
  lecturer: User;
  isHost: boolean;
  generation: Generation;

  isJoined?: boolean;
}

export interface Attendee extends User {
  date?: Date;
}

export interface CourseForm {
  id?: string;

  title: string;
  description: string;
  photos: Photo[];
}

export interface Photo {
  id?: string;
  url: string;
  isMain?: boolean;
}

export interface CourseDetail extends Course {
  description: string;
  createdAt: Date;

  lecturer: User;
  photos: Photo[];
  generations: Generation[];
}

export interface GenerationForm {
  courseId: string;

  subTitle: string;
  description: string;
  startDate: Date;
  endDate: Date;
  genPhoto: string;
  quantity: number;

  id?: string;
}
