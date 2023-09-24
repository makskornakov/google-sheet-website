import Link from 'next/link';
import getTableData from './utils/getTable';
import getTickTok from './utils/getTickTok';
import splitTableData from './utils/tableParser';
import type { Metadata } from 'next';
import Image from 'next/image';
import { HiOutlineMail } from 'react-icons/hi';
import {
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineGlobal,
} from 'react-icons/ai';
import { FaSnapchat } from 'react-icons/fa6';
// import { BsTiktok } from 'react-icons/bs';
import { MailLink, StyledSocialLink } from './page.styled';
import TickTokButton from './Tiktok';
import Script from 'next/script';

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

  // urls for fonts
  // console.log('table', table.Global[0].Description
  return (
    <main
      style={{
        color: table.Colors[0]['Main color'],
        alignItems: table.Layout[0]['Global alignment'],
        background: table.Colors[0]['Background'],
      }}
    >
      <link rel="stylesheet" href={table.Fonts[0]['Heading url']} />
      <link rel="stylesheet" href={table.Fonts[0]['Body url']} />

      <Image src={table.Global[0].Logo} alt="logo" width="200" height="150" />
      <h1
        style={{
          fontSize: '3rem',
          color: table.Colors[0]['Accent color'],
          fontFamily: table.Fonts[0]['Heading name'],
        }}
      >
        {table.Global[0].Title}
      </h1>
      <p
        style={{
          textAlign: 'center',
          fontFamily: table.Fonts[0]['Body name'],
          whiteSpace: 'pre-line',
        }}
        dangerouslySetInnerHTML={{
          __html: table.Global[0].Description,
        }}
      >
        {/* {table.Global[0].Description} */}
      </p>
      <MailLink
        href={`mailto:${table.Global[0].Email}`}
        key={table.Global[0].Email}
        rel="noopener"
        target="_blank"
        accentcolor={table.Colors[0]['Accent color']}
      >
        <HiOutlineMail size={30} />
      </MailLink>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '1rem',
          marginBottom: '5rem',
          marginTop: '1rem',
        }}
      >
        {table.Links.map(async (link) => {
          if (link.Type === 'TikTok') {
            const tickTok = await getTickTok(link.Link);
            const htmlData = tickTok.html as string;
            // console.log('htmlData', htmlData);
            return (
              <TickTokButton
                link={link}
                key={link.Title}
                html={htmlData}
                color={table.Colors[0]['Accent color']}
              />
            );
          } else {
            return (
              <StyledSocialLink
                target="_blank"
                href={link.Link}
                key={link.Title}
                accentcolor={table.Colors[0]['Accent color']}
              >
                {link.Type === 'Instagram' && <AiOutlineInstagram size={30} />}
                {link.Type === 'LinkedIn' && <AiOutlineLinkedin size={30} />}
                {link.Type === 'YouTube' && <AiOutlineYoutube size={30} />}
                {link.Type === 'Website' && <AiOutlineGlobal size={30} />}
                {link.Type === 'SnapChat' && <FaSnapchat size={30} />}
                {link.Title}
              </StyledSocialLink>
            );
          }
        })}
      </div>
      {table.Layout[0]['Display credentials'] == 'Yes' && (
        <Link
          href="https://github.com/makskornakov"
          target="_blank"
          rel="noopener"
          style={{
            fontFamily: table.Fonts[0]['Body name'],
          }}
        >
          {/* copyright sign */}
          &copy; {new Date().getFullYear()}{' '}
          <span
            style={{
              color: table.Colors[0]['Accent color'],
            }}
          >
            Max
          </span>
        </Link>
      )}
    </main>
  );
}
