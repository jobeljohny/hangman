export function isAlphaNum(key: string): boolean {
  let code = key.charCodeAt(0);
  return (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
}

export function getAlphanumericCharacter(input: string): string | null {
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (/^[a-zA-Z0-9]$/.test(char)) {
      return char;
    }
  }
  return null;
}
