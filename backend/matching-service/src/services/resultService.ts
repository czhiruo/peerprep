import { Difficulty, MatchRequest } from '../models/matchRequest';
import { MatchResult } from '../models/matchResult';
import { sendMessage } from '../kafka/producer';

export async function getMatchResult(user1: MatchRequest, user2: MatchRequest): Promise<MatchResult> {
    function getRandomElement<T>(array: T[]): T {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // Find common topics, difficulties, and languages between user 1 and user 2
    const commonTopics = user1.topics.filter((topic) => user2.topics.includes(topic));
    const commonDifficulties = user1.difficulties.filter((difficulty) => user2.difficulties.includes(difficulty));
    const commonLanguages = user1.languages.filter((language) => user2.languages.includes(language));
    
    let selectedTopic: string;
    let selectedDifficulty: Difficulty;
    let selectedLanguage: string;

    selectedTopic = getRandomElement(commonTopics);

    if (commonDifficulties.length > 0) {
        selectedDifficulty = getRandomElement(commonDifficulties);
    } else {
        const difficulties = Array.from(new Set([...user1.difficulties, ...user2.difficulties]));
        selectedDifficulty = getRandomElement(difficulties);
    }

    if (commonLanguages.length > 0) {
        selectedLanguage = getRandomElement(commonLanguages);
    } else {
        const languages = Array.from(new Set([...user1.languages, ...user2.languages]));
        selectedLanguage = getRandomElement(languages);
    }

    const matchResult: MatchResult = {
        userId: user1.userId,
        matchedUserId: user2.userId,
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        language: selectedLanguage,
    };
    
    console.log('--------------------------[MATCHING RESULT]--------------------------');
    console.log(`Matched ${user1.userId} with ${user2.userId}.`);
    console.log(`[MATCH RESULT]: ${JSON.stringify(matchResult)}`);
    console.log('---------------------------------------------------------------------');
    console.log();
    
    await sendMessage('matching-results', { 
        key: matchResult.userId,
        value: {
          userId: matchResult.userId,
          matchedUserId: matchResult.matchedUserId,
          topic: matchResult.topic,
          difficulty: matchResult.difficulty,
          language: matchResult.language,
        }
    });
    return matchResult;
}


export async function notifyMatchFailure(matchRequest: MatchRequest): Promise<void> {
    await sendMessage('match-timeout', {
        key: matchRequest.userId,
        value: {
          userId: matchRequest.userId,
        }
      });
    // Replace with actual notification implementation
    console.log('--------------------------[MATCH FAILURE]----------------------------');
    console.log(`Notifying user ${matchRequest.userId} of match failure.`);
    console.log('---------------------------------------------------------------------');
    console.log();
}