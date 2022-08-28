export const getPages = (count: number, offset: number): number[] => {
  const pages = [];
  const limit = Math.ceil(count / offset);
  for (let i = 1; i <= limit; i += 1) {
    pages.push(i);
  }
  return pages;
};
