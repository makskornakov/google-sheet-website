import { css } from '@linaria/core';

import { reset } from './utils/reset';

export const globals = css`
  :global() {
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

    a {
      ${reset.a}
    }
    main {
      min-height: 100vh;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      align-items: center;
    }
  }
`;
