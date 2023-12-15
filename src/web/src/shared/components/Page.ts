import styled from 'styled-components'

interface PageStyleProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Page = styled.div<PageStyleProps>`
  background-color: ${({ theme, variant = 'primary' }) => theme.background.color[variant]};
`;
