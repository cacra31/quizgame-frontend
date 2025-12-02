export interface AnswerDto {
    answerId: number;
    questionId: number;
    answer: string;
    correctYn: boolean;
}

export interface AnswerRequest {
    roomId: number;
    index: number|null;
    answer: string;
}