export interface LearningPath {
  id: string;
  topic: string;
  description: string;
  createdAt: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  order: number;
  title: string;
  explanation: string;
  keyConcepts: string[];
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number | null;
  quizAnswers: number[];
  completedAt: string | null;
}

export interface PathProgress {
  pathId: string;
  lessons: Record<string, LessonProgress>;
}
