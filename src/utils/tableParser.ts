type Row = string[];
type Table = Row[];
type Tables = Table[];

const rowTableKeys = [
  'Global',
  'Colors',
  'Layout',
  'Header',
  'Meta',
  'Footer',
  'Paragraph',
  'Citation',
  'Contacts',
  'Post',
];

const columnTableKeys = ['Components', 'Pages', 'Navigation', 'Features', 'Slider'];

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

  // const tablesObj = {} as Record<
  //   string,
  //   { id: string; data: Record<string, string> | Record<string, string>[] }
  // >;

  const parsedTables = [] as {
    name: string;
    id: string;
    data: Record<string, string> | Record<string, string>[];
  }[];

  tablesArray.forEach((table) => {
    // remove spaces from table name and id
    const [tableName, tableId] = table[0][0].split('#').map((str) => str.trim());
    console.log('tableName', tableName);
    if (rowTableKeys.includes(tableName)) {
      parsedTables.push({
        name: tableName,
        id: tableId,
        data: parseTableByRow(table.slice(1)),
      });
    } else if (columnTableKeys.includes(tableName)) {
      // console.log('tableName', tableName);
      // parseTableByColumn(table.slice(1));
      parsedTables.push({
        name: tableName,
        id: tableId,
        data: parseTableByColumn(table.slice(1)),
      });
    }
  });

  console.log(parsedTables);
  // const tables = tablesArray.map((table) => {
  //   const [tableName, tableId] = table[0][0].split('#');
  //   if (rowTableKeys.includes(tableName)) {
  //     console.log('tableName', tableName);
  //     return {
  //       id: tableId,
  //       name: tableName,
  //       data: parseTableByRow(table.slice(1)),
  // }
  // }
  // });
  // console.log(tables);

  return tablesArray;
}

function parseTableByRow(table: Table) {
  return table.reduce((acc, row) => {
    const [key, value] = row;
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
}

function parseTableByColumn(table: Table) {
  // console.log('table', table);
  const headings = table[0];
  // an array of objects with keys as headings and values as strings
  const resTablesObj = [] as Record<keyof typeof headings, string>[];
  for (let i = 1; i < table.length; i++) {
    const row = table[i];
    const tableObj = {} as Record<string, string>;
    for (let j = 0; j < row.length; j++) {
      const key = headings[j] as keyof typeof headings;
      tableObj[key as string] = row[j];
    }
    resTablesObj.push(tableObj as Record<keyof typeof headings, string>);
  }
  return resTablesObj;
}
