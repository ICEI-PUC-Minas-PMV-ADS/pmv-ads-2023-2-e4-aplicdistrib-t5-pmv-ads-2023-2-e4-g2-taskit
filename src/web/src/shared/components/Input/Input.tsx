"use client";
import { Label } from "./Input.style";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "transparent";
  borderless?: boolean;
};

export function Input({
  variant = "primary",
  icon,
  borderless,
  ...rest
}: InputProps) {
  return (
    <Label $variant={variant} htmlFor={rest.id} $borderless={borderless}>
      {icon}
      <input {...rest} />
    </Label>
  );
}
