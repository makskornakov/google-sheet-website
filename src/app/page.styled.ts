import Link from 'next/link';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

export const StyledSocialLink = styled(Link)<{ accentcolor: string }>`
  background: #fff;
  border-radius: 0.25rem;
  width: 40rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition-duration: 0.2s;

  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);

  svg {
    position: absolute;
    left: 1rem;
    transition-duration: inherit;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 0.6rem ${(props) => props.accentcolor + '4D'};

    svg {
      color: ${(props) => props.accentcolor};
    }
  }
`;

export const MailLink = styled(Link)<{ accentcolor: string }>`
  svg {
    transition-duration: 0.2s;
  }

  &:hover {
    svg {
      color: ${(props) => props.accentcolor};
    }
  }
`;
