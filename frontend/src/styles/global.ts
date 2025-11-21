import { createGlobalStyle } from "styled-components";

// 1. Definimos o formato que nosso tema tem
interface MyTheme {
  bg: string;
  card: string;
  text: string;
  primary: string;
  muted: string;
}

// 2. Passamos esse tipo para o createGlobalStyle
// O TypeScript agora entende que 'props' contém uma propriedade 'theme' com o formato acima
const GlobalStyle = createGlobalStyle<{ theme: MyTheme }>`
  :root {
    --bg: ${(props) => props.theme.bg};
    --card: ${(props) => props.theme.card};
    --text: ${(props) => props.theme.text};
    --primary: ${(props) => props.theme.primary};
    --muted: ${(props) => props.theme.muted};
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
    overflow-x: hidden;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

export default GlobalStyle;