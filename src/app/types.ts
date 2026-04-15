export interface Note {
  id: string;
  title: string;
  description: string;
  branch: string;
  semester: string;
  subject: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  uploaderName: string;
  fileData?: string; // Base64 encoded file data
}

export const BRANCHES = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
] as const;

export const SEMESTERS = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
] as const;
