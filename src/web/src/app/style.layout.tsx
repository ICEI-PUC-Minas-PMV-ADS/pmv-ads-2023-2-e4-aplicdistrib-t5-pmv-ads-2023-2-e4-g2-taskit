'use client'
import StyledComponentsRegistry from '@/shared/configs/registry'


import { GlobalStyle } from './global.style';
import { ThemeProvider } from '@/shared/hooks/useTheme';

export default function StyleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
