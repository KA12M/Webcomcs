export enum UserRole {
  guest,
  student,
  lecturer,
  admin,
}

export const RoleLabel: any = {
  0: { th: "ทั่วไป", en: "Guest" },
  1: { th: "นักศึกษา", en: "Student" },
  2: { th: "อาจารย์", en: "Lecturer" },
  3: { th: "แอดมิน", en: "Admin" },
};

export const badgeRoleTypes: any = {
  0: ["neutral", "ทั่วไป", "gray"],
  1: ["success", "นักศึกษา", "green"],
  2: ["primary", "อาจารย์", "purple"],
  3: ["danger", "แอดมิน", "red"],
};

// generate id random js