import Link from 'next/link';
import getTableData from './utils/getTable';
import getTickTok from './utils/getTickTok';
import splitTableData from './utils/tableParser';
import type { Metadata } from 'next';
import Image from 'next/image';

const sheetId = '1txP-Pc-fekunT0OkkmLtotDw6oYuhG2hciboXGxV3_k';

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getTableData(sheetId);
  const table = splitTableData(data);
  if (!table) {
    return { title: 'Page not found' };
  }

  const { Title, Description } = table.Global[0];
  return {
    title: Title,
    description: Description,
  };
};
export default async function Home() {
  const data = await getTableData(sheetId);
  const table = splitTableData(data);
  if (!table) {
    return { notFound: true };
  }
  // console.log('table', table);

  // ? get data from TickTok
  // const tickTok = await getTickTok('mentoring.europe');
  // const htmlData = tickTok.html;

  return (
    <main>
      <Image src={table.Global[0].Logo} alt="logo" width="300" height="200" />
      <h1>{table.Global[0].Title}</h1>
      <p>{table.Global[0].Description}</p>

      {table.Links.map((link) => (
        <Link key={link.Title} href={link.Link} target="_blank">
          {link.Title}
        </Link>
      ))}
    </main>
  );
}
