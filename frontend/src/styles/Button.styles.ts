import styled from "styled-components";

export const StyledButton = styled.button<{ variant?: "primary" | "outline" }>`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.15s ease-in-out;

  background: ${({ variant }) =>
    variant === "outline" ? "transparent" : "var(--primary)"};

  color: ${({ variant }) =>
    variant === "outline" ? "var(--primary)" : "#fff"};

  border: ${({ variant }) =>
    variant === "outline" ? "2px solid var(--primary)" : "none"};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
