import { createGlobalStyle } from "styled-components";

interface GlobalStyleProps {
  variant?: "primary" | "secondary" | "tertiary";  
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  :root {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  body {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${({ theme, variant = 'primary' }) => theme.background.color[variant]};
    color: ${({ theme, variant = 'primary' }) => theme.text.color[variant]};
    transition: background 0.5s ease-in-out;
  }
`;
