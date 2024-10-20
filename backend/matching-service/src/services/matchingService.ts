import { MatchRequest } from '../models/matchRequest';
import { MatchingPools } from './matchingPools';
import { hasCommonElement} from '../utils/helperFunctions';
import { getMatchResult, notifyMatchFailure } from './resultService';
import { PriorityQueue } from '../dataStructures/priorityQueue';
import { MatchResult } from '../models/matchResult';
import { MatchStatus } from '../models/matchRequest';

const matchingPools = MatchingPools.getInstance();

export function attemptMatch(matchRequest: MatchRequest): void {
    // Try exact match immediately
    let match = attemptExactMatch(matchRequest);
    let partialMatchTimeout: NodeJS.Timeout;
    let failMatchTimeout: NodeJS.Timeout;

    if (match) {
        console.log('Exact match found for user: ', matchRequest.userId);
        finalizeMatch(matchRequest, match);
    }

    // Schedule partial match attempt after 20 seconds
    partialMatchTimeout = setTimeout(() => {
        console.log('Step in Partial Match Timeout for user: ', matchRequest.userId);
        if (matchRequest.status === MatchStatus.Finding) {
            match = attemptPartialMatch(matchRequest);
            console.log('Attempt to find partial match for user: ', matchRequest.userId);
            if (match) {
                const matchResult = finalizeMatch(matchRequest, match);
                clearTimeout(failMatchTimeout); // Clear the fail timeout if matched
                return;
            }
        }        
    }, 20000);

    // Schedule match failure after 30 seconds
    failMatchTimeout = setTimeout(() => {        
        console.log('Step in Fail Match Timeout for user: ', matchRequest.userId);
        if (matchRequest.status === MatchStatus.Finding) {
            console.log('Match timeout for user: ', matchRequest.userId);
            // Notify frontend about match failure
            matchRequest.status = MatchStatus.Timeout;
            matchingPools.removeMatchRequest(matchRequest);
            notifyMatchFailure(matchRequest);
            return;            
        }        
    }, 30000);

    function finalizeMatch(user1: MatchRequest, user2: MatchRequest): void {
        // Remove both users from Pools
        user1.status = MatchStatus.Matched;
        user2.status = MatchStatus.Matched;
        matchingPools.removeMatchRequest(user1);
        matchingPools.removeMatchRequest(user2);
        clearTimeout(partialMatchTimeout);
        clearTimeout(failMatchTimeout);
    
        // Notify users
        getMatchResult(user1, user2);
    }
}

function attemptExactMatch(newMatchRequest: MatchRequest): MatchRequest | null {
    const potentialMatchesPriorityQueue = getPotentialMatchesQueue(newMatchRequest);
    // Only dequeue the user of the priority queue if that user has the exact matching criteria
    // If the MatchRequest has a priority score of 180 or more, it is an exact match
    while (!potentialMatchesPriorityQueue.isEmpty()) {
        if (potentialMatchesPriorityQueue.peek()!.priority < 180) {
            break;
        }
        const potentialExactMatch = potentialMatchesPriorityQueue.dequeue()!;
        
        if (potentialExactMatch.status === MatchStatus.Finding) {
            return potentialExactMatch;
        }
    }
    return null;
}

function attemptPartialMatch(newMatchRequest: MatchRequest): MatchRequest | null {
    const potentialMatchesPriorityQueue = getPotentialMatchesQueue(newMatchRequest);

     // Dequeue the user with the highest priority score
    while (!potentialMatchesPriorityQueue.isEmpty()) {
        const bestMatch = potentialMatchesPriorityQueue.dequeue()!;
        if (bestMatch.status === MatchStatus.Finding) {
            return bestMatch;
        }
    }
    return null;
}

// Calculate priority score between two users
function calculatePriorityScore(req1: MatchRequest, req2: MatchRequest): number {
    const hasCommonDifficulty = hasCommonElement(req1.difficulties, req2.difficulties);
    const hadCommonLanguage = hasCommonElement(req1.languages, req2.languages);
  
    const priorityScore =   (hasCommonDifficulty ? 120 : 0) +
                            (hadCommonLanguage ? 60 : 0) + 
                            (Date.now() - req2.requestTime) / 1000;
    return priorityScore;
}

function getPotentialMatchesQueue(newMatchRequest: MatchRequest): PriorityQueue<MatchRequest> {
    // Create a priority queue to store all potential matches
    // and efficiently retrieving the highest priority user
    const potentialMatchesPriorityQueue = new PriorityQueue<MatchRequest>();
    
    // Keep track of userIds of the potential matches to avoid duplicates
    // Set ensures each element is unique
    const uniquePotentialMatches = new Set<string>();

    // Get all potential matches from the topic pools and enqueue them to priority queue
    for (const topic of newMatchRequest.topics) {
        const pool = matchingPools.topicPools.get(topic);
        if (pool) {
            pool.toArray().forEach((request) => {
                if (request.userId !== newMatchRequest.userId && 
                    !uniquePotentialMatches.has(request.userId)) 
                {
                    uniquePotentialMatches.add(request.userId);
                    const priorityScore = calculatePriorityScore(newMatchRequest, request);
                    potentialMatchesPriorityQueue.enqueue(request, priorityScore);
                }
            });
        }
    }

    return potentialMatchesPriorityQueue;
}

