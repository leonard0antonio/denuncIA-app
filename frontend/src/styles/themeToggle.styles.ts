import styled from "styled-components";
import { motion } from "framer-motion";

export const ToggleButton = styled(motion.button)`
  border: none;
  background: ${({ theme }) => theme.toggleBackground || "transparent"};
  color: ${({ theme }) => theme.toggleColor || "var(--text)"};
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.toggleHoverBackground || "rgba(0,0,0,0.1)"};
  }
`;
