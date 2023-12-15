"use client";

import { transparentize } from 'polished'

import styled from "styled-components";
import { readableColor, darken, lighten } from "polished";
import { dimmColor } from "@/shared/utils/dimmColor";

type InputProps = {
  $variant: "primary" | "secondary" | "tertiary" | "transparent";
  $borderless?: boolean;
};

export const Label = styled.label<InputProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: solid 1px
    ${({ $variant: variant, theme, $borderless: borderless }) =>
    borderless ? "transparent" : theme.input.border[variant]};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${({ $variant: variant, theme }) =>
    theme.input.background[variant]};
  color: ${({ $variant: variant, theme }) => theme.input.color[variant]};

  &:focus-within {
    outline: solid 2px lightblue;
  }

  > input {
    flex: 1;
    border: none;
    font-size: 1rem;
    height: 2rem;
    background: transparent;
    color: ${({ $variant: variant = "primary", theme }) =>
    readableColor(theme.input.background[variant], "#fff", "#000")};

    &::placeholder {
      color: ${({ $variant: variant, theme }) =>
    dimmColor(theme.input.background[variant])};
    }

    &:focus {
      outline: none;
    }
  }
`;
