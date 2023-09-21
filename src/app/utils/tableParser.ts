import type {
  ColorSheet,
  FontSheet,
  GlobalSheet,
  LayoutSheet,
  SocialLink,
  SocialSheet,
  SomeKey,
} from '../types';

export default function splitTableData(data: string): SocialSheet {
  const columns = data.split('\r\n').map((row) => row.split('\t').filter((col) => col));

  const rawSheet = {} as SocialSheet;
  let currentKey = '' as keyof SocialSheet;
  let currentHeadings = [] as SomeKey[];

  for (let i = 0; i < columns.length; i++) {
    const row = columns[i];
    if (!row.length) {
      continue;
    }
    if (row.length === 1) {
      currentKey = row[0] as keyof SocialSheet;
      currentHeadings = columns[i + 1] as SomeKey[];

      rawSheet[currentKey] = [];

      i++;
    } else {
      const rowObject = {} as GlobalSheet & SocialLink & LayoutSheet & ColorSheet & FontSheet;
      for (let j = 0; j < row.length; j++) {
        rowObject[currentHeadings[j]] = row[j];
      }

      rawSheet[currentKey].push(rowObject);
    }
  }
  return rawSheet;
}
