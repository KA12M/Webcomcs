export class CourseOpenRegister {
  open: boolean;
  data = (open: boolean) =>
    open ? ["ปิดรับลงทะเบียน", "gray"] : ["เปิดลงทะเบียน", "green"];

  constructor(open: boolean) {
    this.open = open;
  }
}
