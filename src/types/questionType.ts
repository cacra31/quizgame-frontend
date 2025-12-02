import type { AnswerDto } from "./answerType";

export interface QuestionDto {
    categoryId: number;
    questionId: number;
    content: string;
    difficulty: number;
    questionType: number;
    answers: AnswerDto[];
}