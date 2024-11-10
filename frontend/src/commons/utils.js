export function extractCode(input) {
    // Matches any language identifier or none
    const regex = /```[\w-]*\n([\s\S]*?)\n```/
    const match = input.match(regex)
    return match ? match[1] : input
  }