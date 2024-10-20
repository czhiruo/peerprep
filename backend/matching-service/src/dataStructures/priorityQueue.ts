export interface PriorityQueueItem<T> {
    item: T;
    priority: number;
  }
  
  export class PriorityQueue<T> {
    private heap: PriorityQueueItem<T>[] = [];
  
    // Return the number of elements in the queue
    size(): number {
      return this.heap.length;
    }
  
    // Check if the queue is empty
    isEmpty(): boolean {
      return this.heap.length === 0;
    }
  
    // Insert an item with a given priority
    enqueue(item: T, priority: number): void {
      const newNode: PriorityQueueItem<T> = { item, priority };
      this.heap.push(newNode);
      this.bubbleUp();
    }
  
    // Remove and return the item with the highest priority
    dequeue(): T | undefined {
      const max = this.heap[0];
      const end = this.heap.pop();
      if (!end) {
        return undefined;
      }
      if (this.heap.length > 0) {
        this.heap[0] = end;
        this.bubbleDown();
      }
      return max.item;
    }

    // Return the item with the highest priority without removing it
    peek(): PriorityQueueItem<T> | undefined {
      if (this.isEmpty()) {
        return undefined;
      }
      return this.heap[0];
    }
  
    // Bubble up the last element to maintain heap property
    private bubbleUp(): void {
      let index = this.heap.length - 1;
      const element = this.heap[index];
  
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
  
        if (element.priority <= parent.priority) break;
  
        this.heap[parentIndex] = element;
        this.heap[index] = parent;
        index = parentIndex;
      }
    }
  
    // Bubble down the first element to maintain heap property
    private bubbleDown(): void {
      let index = 0;
      const length = this.heap.length;
      const element = this.heap[0];
  
      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild: PriorityQueueItem<T> | undefined;
        let rightChild: PriorityQueueItem<T> | undefined;
        let swapIndex: number | null = null;
  
        if (leftChildIndex < length) {
          leftChild = this.heap[leftChildIndex];
          if (leftChild.priority > element.priority) {
            swapIndex = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.heap[rightChildIndex];
          if (
            (swapIndex === null && rightChild.priority > element.priority) ||
            (swapIndex !== null && rightChild.priority > leftChild!.priority)
          ) {
            swapIndex = rightChildIndex;
          }
        }
  
        if (swapIndex === null) break;
  
        this.heap[index] = this.heap[swapIndex];
        this.heap[swapIndex] = element;
        index = swapIndex;
      }
    }
  }