type Row = string[];
type Table = Row[];
type Tables = Table[];

export default function splitTableData(data: string) {
  const columns = data.split('\r\n').map((row) => row.split('\t').filter((col) => col));

  const tablesArray = columns.reduce((acc, row) => {
    if (!row.length) {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(row);
    }
    return acc;
  }, [] as Tables);

  return tablesArray;
}
