'use client'
import StyledComponentsRegistry from '@/shared/configs/registry'
import { ThemeProvider } from '@/shared/hooks/Theme';

import { GlobalStyle } from './global.style';

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
