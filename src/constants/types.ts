export type Answer = {
    title: string;
    isCorrect: boolean;
    description?: string;
  };
  
  export type Question = {
    title: string;
    answers: Answer[];
    description?: string;
  };
  
  export type Exam = {
    id: string;
    title: string;
    questions: Question[];
    description?: string;
  };
  