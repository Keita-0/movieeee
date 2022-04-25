export const DateFormat = (beforeDate: string) => {
  return (
    beforeDate.substring(0, 4) +
    '年' +
    beforeDate.substring(5, 7) +
    '月' +
    beforeDate.substring(8, 10) +
    '日'
  );
};
