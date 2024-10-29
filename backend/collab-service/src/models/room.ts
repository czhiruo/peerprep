// Class which manages the rooms and users in the rooms

import { randomUUID } from "crypto";
import { QuestionDetails } from "../types";
import { getTemplate } from "../utils/codeTemplates";

class Room {
  public roomId: string;
  public users: [string, string];
  public question: QuestionDetails;
  public code: string;

  constructor(users: [string, string], question: QuestionDetails, code: string) {
    this.roomId = randomUUID();
    this.users = users;
    this.question = question;
    this.code = code;
  }

  public getOtherUser(username: string): string {
    return this.users[0] === username ? this.users[1] : this.users[0];
  }
}

class RoomManager {
  // Maps roomId to rooms
  private roomIdToRooms: Map<string, Room> = new Map();
  // Maps username to roomIds
  private usersToRooms: Map<string, string> = new Map();

  // Create a room with two users and question details
  public createRoom(
    users: [string, string],
    question: QuestionDetails,
    language: string
  ): string {
    if (this.usersToRooms.has(users[0]) || this.usersToRooms.has(users[1])) {
      console.log('One or both users are already in a room');
      return 'undefined';
    }

    const room = new Room(users, question, getTemplate(language));
    this.roomIdToRooms.set(room.roomId, room);
    this.usersToRooms.set(users[0], room.roomId);
    this.usersToRooms.set(users[1], room.roomId);

    console.log('Room created:', room.roomId);

    return room.roomId;
  }

  // Remove a room by roomId
  public removeRoom(roomId: string): void {
    const room = this.roomIdToRooms.get(roomId);
    if (!room) {
      console.log('Room does not exist');
      return;
    }

    room.users.forEach((user) => {
      this.usersToRooms.delete(user);
    });
    this.roomIdToRooms.delete(roomId);  
  }

  // Get the other user in the room
  public getOtherUser(username: string): string {
    const roomId = this.usersToRooms.get(username);
    if (!roomId) {
      throw new Error('User not in a room');
    }

    const room = this.roomIdToRooms.get(roomId);
    if (!room) {
      throw new Error('Room does not exist');
    }

    return room.getOtherUser(username);
  }

  public updateCode(roomId: string, code: string): void {
    const room = this.roomIdToRooms.get(roomId);
    if (!room) {
      throw new Error('Room does not exist');
    }

    room.code = code;
  }

  public getRoomId(username: string): string {
    return this.usersToRooms.get(username) || 'undefined';
  }

  public getQuestion(roomId: string): QuestionDetails {
    const room = this.roomIdToRooms.get(roomId);
    if (!room) {
      throw new Error('Room does not exist');
    }

    return room.question;
  }
}

export const roomManager = new RoomManager();