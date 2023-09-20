export default async function getTableData(sheetID: string) {
  const publicUrl = `https://docs.google.com/spreadsheets/d/${sheetID}/export?format=tsv`;

  const res = await fetch(publicUrl, {
    method: 'GET',
    cache: 'no-cache',
  });

  return await res.text();
}
