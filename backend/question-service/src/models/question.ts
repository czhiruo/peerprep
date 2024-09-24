import { ObjectId } from "mongodb";

export interface Question {
    questionId: ObjectId;
    questionTitle: string;
    questionDescription: string;
    questionCategory: string;
    questionComplexity: string;
  }
  