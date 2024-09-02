import { Exam } from '../constants/types';

const LOCAL_STORAGE_KEY = 'exams';

export const getExamsFromLocalStorage = (): Exam[] => {
  const exams = localStorage.getItem(LOCAL_STORAGE_KEY);
  return exams ? JSON.parse(exams) : [];
};

export const getExamByIdFromLocalStorage = (id: string): Exam | null => {
  const exams = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!exams) {
    return null;
  }
  
  const parsedExams: Exam[] = JSON.parse(exams);
  return parsedExams.find((exam) => exam.id === id) || null;
};

export const saveExamToLocalStorage = (exam: Exam): void => {
  const exams = getExamsFromLocalStorage();
  if (exam.id) {
    // Update existing exam
    const updatedExams = exams.map((e) => (e.id === exam.id ? exam : e));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedExams));
  } else {
    // Add new exam
    exam.id = Date.now().toString(); // Add an ID for new exams
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...exams, exam]));
  }
};

export const deleteExamFromLocalStorage = (id: string): void => {
  const exams = getExamsFromLocalStorage();
  const updatedExams = exams.filter((exam) => exam.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedExams));
};
