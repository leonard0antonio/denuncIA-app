import React from "react";
import { StyledButton } from "../styles/Button.styles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export default function Button({ children, variant = "primary", ...rest }: Props) {
  return (
    <StyledButton variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}
