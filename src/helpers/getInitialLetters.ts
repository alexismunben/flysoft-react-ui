export const getInitialLetters = (text: string): string => {
    return text.split(' ')
      .filter((word, index, arr) => ( index === 0 || index === arr.length - 1 ? word : null))
      .map(word => word.substring(0,1)).join('');
}
