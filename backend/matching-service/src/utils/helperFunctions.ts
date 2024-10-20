export function hasCommonElement(arr1: string[], arr2: string[]): boolean {
    return arr1.some((item) => arr2.includes(item));
  }
  
  export function countCommonElements(arr1: string[], arr2: string[]): number {
    return arr1.filter((item) => arr2.includes(item)).length;
  }