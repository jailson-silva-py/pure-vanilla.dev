export function getDateFormater() {
  const date = new Date();
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}]`
} 