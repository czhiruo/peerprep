import { attemptMatch } from '../src/services/matchingService';
import { MatchRequest, MatchStatus } from '../src/models/matchRequest';
import { MatchResult } from '../src/models/matchResult';
import { MatchingPools } from '../src/services/matchingPools';
import { Difficulty } from '../src/models/matchRequest';
import { beforeEach, describe, test, expect } from '@jest/globals';

let matchingPools: MatchingPools;;


beforeEach(() => {
  // Clear the pools before each test
  matchingPools = MatchingPools.getInstance();
  matchingPools.topicPools.clear();
  matchingPools.difficultyPools.clear();
  matchingPools.languagePools.clear();
});

describe('Matching Service Tests', () => {
    test('User matches with themselves should be prevented', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['art'],
            difficulties: [Difficulty.Easy],
            languages: ['en'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
        matchingPools.enqueueMatchRequest(user1);
        const matchResult = attemptMatch(user1);
        expect(matchResult).toBeNull();
    });

    test('No match when no common topics', () => {
        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['math', 'science'],
            difficulties: [Difficulty.Medium],
            languages: ['en'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['history', 'art'],
            difficulties: [Difficulty.Medium],
            languages: ['en'],
            requestTime: Date.now(),
            status: MatchStatus.Finding,
        };
    
        matchingPools.enqueueMatchRequest(user2);
        const matchResult = attemptMatch(user1);
    
        expect(matchResult).toBeNull();
    });
  
    test('Multiple potential matches with priority', () => {
        const now = Date.now();

        const user1: MatchRequest = {
            userId: 'user1',
            topics: ['physics'],
            difficulties: [Difficulty.Easy, Difficulty.Medium],
            languages: ['en', 'fr'],
            requestTime: now,
            status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
            userId: 'user2',
            topics: ['physics'],
            difficulties: [Difficulty.Easy],
            languages: ['en'],
            requestTime: now - 5000, // Arrived 5 seconds earlier
            status: MatchStatus.Finding,
        };
    
        const user3: MatchRequest = {
            userId: 'user3',
            topics: ['physics'],
            difficulties: [Difficulty.Medium],
            languages: ['en'],
            requestTime: now - 10000, // Arrived 10 seconds earlier
            status: MatchStatus.Finding,
        };
    
        matchingPools.enqueueMatchRequest(user2);
        matchingPools.enqueueMatchRequest(user3);
        const matchResult = attemptMatch(user1);
    
        expect(matchResult).not.toBeNull();
    
        if (matchResult) {
            expect(matchResult.userId).toBe('user1');
            expect(matchResult.matchedUserId).toBe('user3'); // user3 has higher priority
            expect(matchResult.topic).toBe('physics');
            expect([Difficulty.Easy, Difficulty.Medium]).toContain(matchResult.difficulty);
            expect(matchResult.language).toBe('en');
        }
    });   
    
    test('User 1 and User 3 should match exactly, User 2 should timeout', () => {
        // User 1 arrives first, then user 2 arrives 5 seconds later, and user 3 arrives 10 seconds later
        // User 2 is a partial match with User 1, but User 3 is an exact match
        // So User 1 should match exactly with User 3, and User 2 should timeout
        // Since at the time user 3 arrives, user 1 havent reach more than 20 seconds yet, so partial match is not activated yet.

        const now = Date.now();

        const user1: MatchRequest = {
          userId: 'user1',
          topics: ['topicA'],
          difficulties: [Difficulty.Easy],
          languages: ['en'],
          requestTime: now,
          status: MatchStatus.Finding,
        };
    
        const user2: MatchRequest = {
          userId: 'user2',
          topics: ['topicA'],
          difficulties: [Difficulty.Medium],
          languages: ['en'],
          requestTime: now + 5000, // Arrives 5 seconds after User 1
          status: MatchStatus.Finding,
        };
    
        const user3: MatchRequest = {
          userId: 'user3',
          topics: ['topicA'],
          difficulties: [Difficulty.Easy],
          languages: ['en'],
          requestTime: now + 10000, // Arrives 10 seconds after User 1
          status: MatchStatus.Finding,
        };

        matchingPools.enqueueMatchRequest(user1);
        const matchResult1 = attemptMatch(user1);
        matchingPools.enqueueMatchRequest(user2);
        const matchResult2 = attemptMatch(user1);
        matchingPools.enqueueMatchRequest(user3);
        const matchResult3= attemptMatch(user1);
    
        // expect(matchResult).not.toBeNull();
    
        // if (matchResult) {
        //     expect(matchResult.userId).toBe('user1');
        //     expect(matchResult.matchedUserId).toBe('user3'); // user3 has higher priority
        //     expect(matchResult.topic).toBe('physics');
        //     expect([Difficulty.Easy, Difficulty.Medium]).toContain(matchResult.difficulty);
        //     expect(matchResult.language).toBe('en');
        // }

    });
  });