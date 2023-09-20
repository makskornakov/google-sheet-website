export default async function Table() {
  const sheetId = '1txP-Pc-fekunT0OkkmLtotDw6oYuhG2hciboXGxV3_k';
  // parse public google sheet without auth
  const data = await getTableData(sheetId);
  const tickTok = await getTickTok('mentoring.europe');
  console.log(splitTableData(data));
  const htmlData = tickTok.html;
  return (
    <div>
      <h1>Table</h1>
      {/* table data pretified */}
      <p
        style={{
          whiteSpace: 'pre-wrap',
        }}
      >
        {/* {splitTableData(data)} */}
        {/* dangerous html */}
      </p>
      <div dangerouslySetInnerHTML={{ __html: htmlData }} />
    </div>
  );
}
async function getTickTok(account: string) {
  // https://www.tiktok.com/oembed?url=https://www.tiktok.com/@scout2015

  const url = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${account}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

    cache: 'no-cache',
  });
  const data = await res.json();
  return data;
}
async function getTableData(sheetID: string) {
  // console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/A1:Z999?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  const publicUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=tsv`;

  const res = await fetch(publicUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },

    cache: 'no-cache',
  });

  const data = await res.text();

  // console.log('data', data);
  return data;
}

// spread by roes and columns
function splitTableData(data: string) {
  // console.log(data);
  const rows = data.split('\r\n');
  // console.log(rows);

  const columns = rows.map((row) => row.split('\t').filter((col) => col));
  // console.log('columns', columns);
  const rawSheet = {};
  let currentKey = 'no';
  let currentHeadings = [] as string[];
  for (let i = 0; i < columns.length; i++) {
    const row = columns[i];
    if (!row.length) {
      continue;
    }
    if (row.length === 1) {
      currentKey = row[0];
      //@ts-ignore
      rawSheet[currentKey] = [];
      currentHeadings = columns[i + 1];
      i++;
    } else {
      const rowObject = {};
      for (let j = 0; j < row.length; j++) {
        const value = row[j];
        const key = currentHeadings[j];
        // @ts-ignore
        rowObject[key] = value;
      }
      // @ts-ignore
      rawSheet[currentKey].push(rowObject);
    }
  }
  return rawSheet;
}
