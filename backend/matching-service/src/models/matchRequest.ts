export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard",
}

export enum MatchStatus {
    Pending = "pending",
    Finding = "finding",
    Matched = "matched",
    Cancelled = "cancelled",
    Timeout = "timeout",
}

export interface MatchRequest {
    userId: string;
    topics: string[];
    difficulties: Difficulty[];
    languages: string[];
    requestTime: number;  // Timestamp when the request was received
    status: MatchStatus;
}
