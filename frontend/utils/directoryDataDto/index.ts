import { nanoid } from '@reduxjs/toolkit';

export const directoryDataDto = (dataArr: any) => dataArr.map((el: any) => ({
  id: nanoid(),
  values: el.values,
  fetchParams: el.fetchParams,
  label: el.label,
}));
