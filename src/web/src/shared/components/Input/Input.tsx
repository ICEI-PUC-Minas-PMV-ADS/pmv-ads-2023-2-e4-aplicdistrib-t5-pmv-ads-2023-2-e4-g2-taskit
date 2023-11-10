"use client";
import { Label } from "./Input.style";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "transparent";
  borderless?: boolean;
  key: string;
};

export function Input({
  variant = "primary",
  icon,
  borderless,
  key,
  ...rest
}: InputProps) {
  return (
    <Label
      key={key}
      $variant={variant}
      htmlFor={rest.id}
      $borderless={borderless}
    >
      {icon}
      <input {...rest} />
    </Label>
  );
}
