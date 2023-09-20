import { css } from '@linaria/core';

import { reset } from './utils/reset';

export const globals = css`
  :global() {
    :root {
      --text-rgb: 0, 0, 0;
      --background-rgb: 255, 255, 255;
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    html,
    body {
      max-width: 100vw;
      overflow-x: hidden;
    }

    body {
      color: rgb(var(--text-rgb));
      background: rgb(var(--background-rgb));
    }

    a {
      ${reset.a}
    }
    main {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
