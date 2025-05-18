export  default function fixEnding (number: number, arrWords: string[]) {
    const afterDozens = number % 10
    // console.log('function ending', number, arrWords, afterDozens)
    if (afterDozens === 1) {
      return `${number} ${arrWords[0]}`
    }
    if (afterDozens >= 2 && afterDozens <= 4) {
      return `${number} ${arrWords[1]}`
    }
    return `${number} ${arrWords[2]}`
  }