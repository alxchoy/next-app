export function capitalize(word: string): Capitalize<string> {
  return (word.charAt(0).toUpperCase() +
    word.slice(1).toLocaleLowerCase()) as Capitalize<typeof word>;
}
