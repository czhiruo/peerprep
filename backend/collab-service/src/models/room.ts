// Class which manages the rooms and users in the rooms

import { randomUUID } from "crypto";



class RoomManager {
  // Maps from roomId to a set of usernames
  private roomsToUsers: Map<string, Set<string>> = new Map();
  // Maps from a username to a roomId
  private usersToRooms: Map<string, string> = new Map();

  // Create a room containing the usernames
  public createRoom(usernames: string[]): void {
    if (usernames.length != 2) {
      console.log('Invalid number of users');
      return;      
    }

    const roomId = randomUUID();
    this.roomsToUsers.set(roomId, new Set(usernames));
    usernames.forEach((username) => {
      this.usersToRooms.set(username, roomId);
    });

    console.log('Room created:', roomId);
  }

  // Remove a room
  public removeRoom(roomId: string): void {
    const usernames = this.roomsToUsers.get(roomId);
    if (!usernames) {
      console.log('Room does not exist');
      return;
    }

    usernames.forEach((username) => {
      this.usersToRooms.delete(username);
    });
    this.roomsToUsers.delete(roomId);
  }

  public getOtherUser(username: string): string {
    const roomId = this.usersToRooms.get(username);
    if (!roomId) {
      throw new Error('User not in a room');
    }

    const usernames = this.roomsToUsers.get(roomId);
    if (!usernames) {
      throw new Error('Room does not exist');
    }

    return Array.from(usernames).find((user) => user !== username) || 'undefined';
  }

  public getRoomId(username: string): string {
    return this.usersToRooms.get(username) || 'undefined';
  }

  public getUsersInRoom(roomId: string): Set<string> {
    return this.roomsToUsers.get(roomId) || new Set();
  }
}

export const roomManager = new RoomManager();