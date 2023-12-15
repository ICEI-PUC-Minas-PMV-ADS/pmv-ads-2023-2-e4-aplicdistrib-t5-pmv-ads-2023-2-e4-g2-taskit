import { createGlobalStyle } from "styled-components";
import { darken } from "polished";

interface GlobalStyleProps {
  variant?: "primary" | "secondary" | "tertiary";  
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  :root {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;

    @media (width < 768px) {
      font-size: 16px;
    }
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
    background-image: ${({ theme, variant = 'primary' }) => `radial-gradient(circle at center, ${darken(0.2, theme.background.color.primary)} 0%, ${darken(0.2, theme.background.color.primary)} 1%, ${theme.background.color[variant]} 100%)`};
    color: ${({ theme, variant = 'primary' }) => theme.text.color[variant]};
    transition: background 2s ease-in-out;
  }
`;
