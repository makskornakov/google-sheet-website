'use client';

import { BsTiktok } from 'react-icons/bs';
import { StyledSocialLink } from './page.styled';
import { SocialLink } from './types';
import { useRef } from 'react';
import { TikTokWrapper } from './Tiktok.styled';

export default function TickTokButton({
  link,
  html,
  color,
}: {
  link: SocialLink;
  html: string;
  color: string;
}) {
  const tikTokEmbed = useRef<HTMLDivElement>(null);
  return (
    <>
      <StyledSocialLink
        href="#"
        accentcolor={color}
        onClick={(e) => {
          console.log('click');
          e.preventDefault();
          // e.stopPropagation();

          if (tikTokEmbed.current) {
            tikTokEmbed.current.style.display = 'grid';
          }
        }}
      >
        <BsTiktok size={25} />
        {link.Title}
      </StyledSocialLink>
      <div
        ref={tikTokEmbed}
        style={{
          display: 'none',
          width: '100vw',
          height: '100vh',
          placeItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2,
        }}
        onClick={() => {
          console.log('click close');

          if (tikTokEmbed.current) {
            tikTokEmbed.current.style.display = 'none';
          }
        }}
      >
        <TikTokWrapper dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}
