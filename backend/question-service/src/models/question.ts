import { ObjectId } from "mongodb";

export interface Question {
    questionId: ObjectId;
    questionTitle: string;
    questionDescription: string;
    questionCategory: string;
    questionComplexity: string;
  }
  
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
  