export interface Paper {
  title: string
  abstract: string
  url: string
  pdf: string
  authors?: string[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  answer: string
}

export interface Analysis {
  analysis: string
  quiz?: QuizQuestion[]
}