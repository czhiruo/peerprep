import { Difficulty } from "./matchRequest";

export interface MatchResult {
    userId: string;
    matchedUserId: string;
    topic: string;
    difficulty: Difficulty;
    language: string;
}