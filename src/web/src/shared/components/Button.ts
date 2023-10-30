import styled from 'styled-components';

interface ButtonStyleProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'transparent';
  border?: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  background-color: ${({ variant = 'primary', theme }) => theme.button.background[variant]};
  color: ${({ variant = 'primary', theme }) => theme.button.color[variant]};
  border: ${({ border, variant, theme }) => border && variant ? `1px solid ${theme.button.border[variant]}` : 'none'};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #34495e;
  }
`;
