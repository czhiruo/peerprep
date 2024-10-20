import { getMatchResult } from '../src/services/resultService';
import { MatchRequest, Difficulty, MatchStatus } from '../src/models/matchRequest';
import { beforeEach, describe, test, expect } from '@jest/globals';

describe('getMatchResult Function Tests', () => {
    test('Exact match with common topics, difficulties, and languages', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Strings', 'Algorithms'],
            difficulties: [Difficulty.Easy, Difficulty.Medium],
            languages: ['Java', 'Python'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Algorithms', 'Databases'],
            difficulties: [Difficulty.Medium, Difficulty.Hard],
            languages: ['Java', 'C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(matchResult.userId).toBe('user1');
        expect(matchResult.matchedUserId).toBe('user2');
        expect(matchResult.topic).toBe('Algorithms');
        expect(matchResult.difficulty).toBe(Difficulty.Medium);
        expect(matchResult.language).toBe('Java');
    });
    
    test('Partial match with common topics, languages but no common difficulties', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Recursion'],
            difficulties: [Difficulty.Easy],
            languages: ['Java'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Recursion'],
            difficulties: [Difficulty.Medium],
            languages: ['Java'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(matchResult.topic).toBe('Recursion');
        expect([Difficulty.Easy, Difficulty.Medium]).toContain(matchResult.difficulty);
        expect(matchResult.language).toBe('Java');
    });
    
    test('Partial match with common topics, difficulties but no common languages', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Databases'],
            difficulties: [Difficulty.Medium],
            languages: ['Java'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Databases'],
            difficulties: [Difficulty.Medium],
            languages: ['C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(matchResult.topic).toBe('Databases');
        expect(matchResult.difficulty).toBe(Difficulty.Medium);
        expect(['Java', 'C']).toContain(matchResult.language);
    });
    
    test('Partial match with common topics but no common difficulties and languages', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Bit Manipulation'],
            difficulties: [Difficulty.Hard],
            languages: ['Java'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Bit Manipulation'],
            difficulties: [Difficulty.Medium],
            languages: ['C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(matchResult.topic).toBe('Bit Manipulation');
        expect([Difficulty.Medium, Difficulty.Hard]).toContain(matchResult.difficulty);
        expect(['Java', 'C']).toContain(matchResult.language);
    });
    
    test('Random selection when multiple common topics', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Strings', 'Algorithms'],
            difficulties: [Difficulty.Easy, Difficulty.Medium],
            languages: ['Java', 'Python'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Strings', 'Algorithms'],
            difficulties: [Difficulty.Medium, Difficulty.Hard],
            languages: ['Java', 'C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(['Strings', 'Algorithms']).toContain(matchResult.topic);
        expect(matchResult.difficulty).toBe(Difficulty.Medium);
        expect(matchResult.language).toBe('Java');
    });
    
    test('Random selection when multiple common difficulties', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Strings', 'Algorithms'],
            difficulties: [Difficulty.Easy, Difficulty.Medium],
            languages: ['Java', 'Python'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Strings', 'Recursion'],
            difficulties: [Difficulty.Medium, Difficulty.Easy],
            languages: ['Java', 'C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(matchResult.topic).toBe('Strings');
        expect([Difficulty.Medium, Difficulty.Easy]).toContain(matchResult.difficulty);
        expect(matchResult.language).toBe('Java');
    });
    
    test('Random selection when multiple common languages', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['Strings', 'Algorithms'],
            difficulties: [Difficulty.Easy, Difficulty.Medium],
            languages: ['Java', 'C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['Strings', 'Recursion'],
            difficulties: [Difficulty.Medium, Difficulty.Hard],
            languages: ['Java', 'C'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const matchResult = getMatchResult(user1, user2);
    
        expect(matchResult).not.toBeNull();
        expect(matchResult.topic).toBe('Strings');
        expect(matchResult.difficulty).toBe(Difficulty.Medium);
        expect(['Java', 'C']).toContain(matchResult.language);
    });
});