"use client";

import { darken, lighten, readableColor } from "polished";
import styled from "styled-components";
import { dimmColor } from "../utils/dimmColor";

interface ButtonStyleProps {
  $variant?: "primary" | "secondary" | "tertiary" | "transparent";
  $border?: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  height: 2.5rem;
  border-radius: 0.25rem;
  border: ${({ $border: border, $variant: variant, theme }) =>
    border && variant ? `1px solid ${theme.button.border[variant]}` : "none"};
  background-color: ${({ $variant: variant = "primary", theme }) =>
    theme.button.background[variant]};

  color: ${({ $variant: variant = "primary", theme }) =>
    readableColor(
      darken(0.1, theme.button.background[variant]),
      "#fff",
      "#000"
    )};
  font-size: 1rem;

  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
  padding: 0 1rem;

  &:hover,
  &:focus {
    background-color: ${({ $variant: variant = "primary", theme }) =>
      darken(0.1, theme.button.background[variant])};
    color: ${({ $variant: variant = "primary", theme }) =>
      variant !== "transparent"
        ? dimmColor(darken(0.1, theme.button.background[variant]))
        : lighten(0.4, theme.text.color.secondary)};
  }
`;
