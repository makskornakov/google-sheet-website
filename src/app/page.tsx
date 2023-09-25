import getTableData from '~/utils/getTable';

import splitTableData from '~/utils/tableParser';
import type { Metadata } from 'next';
import Image from 'next/image';

const sheetId = process.env.GOOGLE_SHEET_ID as string;

// export const generateMetadata = async (): Promise<Metadata> => {
//   const data = await getTableData(sheetId);
//   const table = splitTableData(data);
//   if (!table) {
//     return { title: 'Page not found' };
//   }

//   const { Title, Description, Favicon } = table.Global[0];
//   return {
//     title: Title,
//     description: Description,
//     icons: {
//       icon: Favicon,
//     },
//   };
// };
export default async function Home() {
  const data = await getTableData(sheetId);
  const tables = splitTableData(data);
  if (!tables) {
    return { notFound: true };
  }

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        width: 'fit-content',
        flexDirection: 'row',
        rowGap: '2rem',
        columnGap: '2rem',
        flexWrap: 'wrap',
      }}
    >
      {tables.map((table, index) => {
        return (
          <table
            key={index}
            style={{
              padding: '0.5rem',
              border: '1px solid red',
            }}
          >
            {table.map((row, j) => {
              return (
                <tr key={j}>
                  {row.map((col, i) => {
                    return (
                      <td
                        key={i}
                        style={{
                          border: '1px solid black',
                        }}
                      >
                        {col}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        );
      })}
    </div>
  );
}
