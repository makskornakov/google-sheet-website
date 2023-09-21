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
import { BsTiktok } from 'react-icons/bs';
import { StyledSocialLink } from './page.styled';

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
        backgroundColor: table.Colors[0]['Background'],
        color: table.Colors[0]['Main color'],
      }}
    >
      <style>
        {`
          @import url(${table.Fonts[0]['Heading url']});
          @import url(${table.Fonts[0]['Body url']});
        `}
      </style>
      <Image src={table.Global[0].Logo} alt="logo" width="300" height="200" />
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
          fontFamily: table.Fonts[0]['Body name'],
        }}
      >
        {table.Global[0].Description}
      </p>

      {/* <a target="_blank" rel="noopener" data-testid="SocialIcon" href="mailto:Info@Mentoringeurope.eu" aria-label="@Mentoring_Europe email address" class="sc-eCssSg lbrsth sc-kstrdz btjemE"><svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" class="sc-gKsewC fwXqBO"><title data-testid="svgTitle" id="title_0.7153391068046636">email</title><path d="M18.821,20.5H5.179A3.683,3.683,0,0,1,1.5,16.821V7.179A3.683,3.683,0,0,1,5.179,3.5H18.821A3.683,3.683,0,0,1,22.5,7.179v9.642A3.683,3.683,0,0,1,18.821,20.5ZM5.179,4.5A2.682,2.682,0,0,0,2.5,7.179v9.642A2.682,2.682,0,0,0,5.179,19.5H18.821A2.682,2.682,0,0,0,21.5,16.821V7.179A2.682,2.682,0,0,0,18.821,4.5Z"></path><path d="M12,14.209a.5.5,0,0,1-.346-.138L4.286,7.028a.5.5,0,0,1,.691-.723L12,13.018l7.023-6.713a.5.5,0,1,1,.691.723l-7.368,7.043A.5.5,0,0,1,12,14.209Z"></path><path d="M4.7,17.833a.5.5,0,0,1-.347-.86l5.54-5.31a.5.5,0,0,1,.692.722L5.048,17.694A.5.5,0,0,1,4.7,17.833Z"></path><path d="M19.3,17.832a.5.5,0,0,1-.346-.139l-5.538-5.308a.5.5,0,0,1,.692-.722l5.538,5.308a.5.5,0,0,1-.346.861Z"></path></svg></a> */}
      {/* link to email */}
      <Link
        href={`mailto:${table.Global[0].Email}`}
        key={table.Global[0].Email}
        rel="noopener"
        target="_blank"
      >
        <HiOutlineMail size={30} />
      </Link>

      {table.Links.map(async (link) => {
        if (link.Type === 'TickTok') {
          const tickTok = await getTickTok(link.Link);
          const htmlData = tickTok.html;
          // return <div key={link.Title} dangerouslySetInnerHTML={{ __html: htmlData }} />;
        } else {
          return (
            <StyledSocialLink
              href={link.Link}
              key={link.Title}
              accentcolor={table.Colors[0]['Accent color']}
            >
              {link.Type === 'Instagram' && <AiOutlineInstagram size={30} />}
              {link.Type === 'LinkedIn' && <AiOutlineLinkedin size={30} />}
              {link.Type === 'YouTube' && <AiOutlineYoutube size={30} />}
              {link.Type === 'TikTok' && <BsTiktok size={25} />}
              {link.Type === 'Website' && <AiOutlineGlobal size={30} />}
              {link.Title}
            </StyledSocialLink>
          );
        }
      })}
    </main>
  );
}
