import { Note } from "../types";

// Minimal valid PDF in base64 format
const createSamplePDF = (title: string) => {
  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(${title}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000317 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
410
%%EOF`;
  
  return `data:application/pdf;base64,${btoa(pdfContent)}`;
};

export const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Data Structures and Algorithms Complete Notes",
    description: "Comprehensive notes covering arrays, linked lists, trees, graphs, sorting, and searching algorithms with examples.",
    branch: "Computer Science",
    semester: "3rd Semester",
    subject: "Data Structures and Algorithms",
    fileName: "DSA_Complete_Notes.pdf",
    fileSize: 2456789,
    uploadDate: new Date("2026-03-10"),
    uploaderName: "Rahul Sharma",
    fileData: "",
  },
  {
    id: "2",
    title: "Object-Oriented Programming with Java",
    description: "Detailed notes on OOP concepts including inheritance, polymorphism, encapsulation, and abstraction with Java examples.",
    branch: "Computer Science",
    semester: "4th Semester",
    subject: "Object-Oriented Programming",
    fileName: "OOP_Java_Notes.pdf",
    fileSize: 1892345,
    uploadDate: new Date("2026-03-12"),
    uploaderName: "Priya Patel",
    fileData: "",
  },
  {
    id: "3",
    title: "Database Management Systems - SQL & NoSQL",
    description: "Complete guide to DBMS concepts, SQL queries, normalization, transactions, and introduction to NoSQL databases.",
    branch: "Information Technology",
    semester: "5th Semester",
    subject: "Database Management Systems",
    fileName: "DBMS_Complete.pdf",
    fileSize: 3124567,
    uploadDate: new Date("2026-03-15"),
    uploaderName: "Amit Kumar",
    fileData: "",
  },
  {
    id: "4",
    title: "Digital Electronics and Logic Design",
    description: "Notes covering Boolean algebra, logic gates, combinational and sequential circuits, and digital system design.",
    branch: "Electronics & Communication",
    semester: "2nd Semester",
    subject: "Digital Electronics",
    fileName: "Digital_Electronics.pdf",
    fileSize: 2678901,
    uploadDate: new Date("2026-03-18"),
    uploaderName: "Sneha Reddy",
    fileData: "",
  },
  {
    id: "5",
    title: "Operating Systems Concepts and Implementation",
    description: "Comprehensive notes on process management, memory management, file systems, and OS implementation techniques.",
    branch: "Computer Science",
    semester: "5th Semester",
    subject: "Operating Systems",
    fileName: "OS_Notes.pdf",
    fileSize: 2934567,
    uploadDate: new Date("2026-03-20"),
    uploaderName: "Vikram Singh",
    fileData: "",
  },
  {
    id: "6",
    title: "Computer Networks - TCP/IP and Protocols",
    description: "Detailed study of network layers, TCP/IP protocol suite, routing algorithms, and network security basics.",
    branch: "Information Technology",
    semester: "6th Semester",
    subject: "Computer Networks",
    fileName: "CN_Complete_Guide.pdf",
    fileSize: 2567890,
    uploadDate: new Date("2026-03-22"),
    uploaderName: "Anjali Verma",
    fileData: "",
  },
  {
    id: "7",
    title: "Microprocessor and Microcontroller 8085/8086",
    description: "Complete notes on 8085 and 8086 architecture, assembly language programming, and interfacing techniques.",
    branch: "Electronics & Communication",
    semester: "4th Semester",
    subject: "Microprocessors",
    fileName: "Microprocessor_Notes.pdf",
    fileSize: 2123456,
    uploadDate: new Date("2026-03-25"),
    uploaderName: "Karthik Nair",
    fileData: "",
  },
  {
    id: "8",
    title: "Engineering Mathematics - Linear Algebra",
    description: "Matrix operations, vector spaces, eigenvalues, eigenvectors, and applications in engineering problems.",
    branch: "Computer Science",
    semester: "1st Semester",
    subject: "Engineering Mathematics",
    fileName: "Math_Linear_Algebra.pdf",
    fileSize: 1845678,
    uploadDate: new Date("2026-03-28"),
    uploaderName: "Meera Iyer",
    fileData: "",
  },
  {
    id: "9",
    title: "Web Technologies - HTML, CSS, JavaScript",
    description: "Complete guide to modern web development with HTML5, CSS3, JavaScript ES6+, and responsive design principles.",
    branch: "Information Technology",
    semester: "6th Semester",
    subject: "Web Technologies",
    fileName: "Web_Tech_Complete.pdf",
    fileSize: 3456789,
    uploadDate: new Date("2026-04-01"),
    uploaderName: "Rohan Desai",
    fileData: "",
  },
  {
    id: "10",
    title: "Software Engineering - SDLC and Agile",
    description: "Software development life cycle, agile methodologies, project management, testing, and quality assurance.",
    branch: "Computer Science",
    semester: "7th Semester",
    subject: "Software Engineering",
    fileName: "SE_SDLC_Agile.pdf",
    fileSize: 2789012,
    uploadDate: new Date("2026-04-05"),
    uploaderName: "Divya Krishnan",
    fileData: "",
  },
];
