export function isAlphaNum(key: string): boolean {
  let code = key.charCodeAt(0);
  return (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
}
