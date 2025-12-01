import type { QuestionDto } from "./questionType";

export interface GameEvent {
    type: string;
    roomId: number|null;
    index: number|null;
    question : QuestionDto|null;
}