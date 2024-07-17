/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { array, term } = data;
  const result = array.filter((item: any) => containsTerm(item, term));
  postMessage(result);
});

function containsTerm(item: any, term: string): boolean {
  if (item && typeof item === 'object') {
    return Object.values(item).some(value => containsTerm(value, term));
  }
  if (typeof item === 'string') {
    return item.toLowerCase().includes(term);
  }
  if (typeof item === 'number') {
    return item.toString().includes(term);
  }
  return false;
}
