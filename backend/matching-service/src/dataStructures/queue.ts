export class Queue<T> {
    private items: T[] = [];
  
    // Add an item at the end of the queue
    enqueue(item: T): void {
      this.items.push(item);
    }
  
    // Delete an item from the front of the queue
    dequeue(): T | undefined {
      return this.items.shift();
    }
  
    // Check if the queue is empty
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    // Return the number of elements in the queue
    size(): number {
      return this.items.length;
    }
  
    // Iterate over the items
    forEach(callback: (item: T) => void): void {
      this.items.forEach(callback);
    }
  
    // Remove a specific item from the queue
    remove(item: T): void {
      this.items = this.items.filter((i) => i !== item);
    }
  
    // Get all items as an array
    toArray(): T[] {
      return [...this.items];
    }

    // View the items in the queue as a string
    viewItems(): string {
      return this.items.map(item => JSON.stringify(item)).join(', ');
    }

  }