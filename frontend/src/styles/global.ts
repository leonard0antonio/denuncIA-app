import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #f7f9fc;
    --card: #ffffff;
    --text: #0f172a;
    --primary: #0b5cff;
    --muted: #6b7280;
  }

  body.dark {
    --bg: #0f1724;
    --card: #0b1320;
    --text: #e6eef8;
    --primary: #3aa0ff;
    --muted: #94a3b8;
  }

  body {
    background: var(--bg);
    color: var(--text);
    transition: background .25s, color .25s;
  }

  .app-container {
    max-width: 1100px;
    margin: 24px auto;
    padding: 16px;
  }
`;
