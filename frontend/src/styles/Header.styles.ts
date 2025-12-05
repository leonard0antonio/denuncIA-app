import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Bar = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--card); 
  padding: 12px 24px;
  box-shadow: 0 1px 15px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.25s ease, color 0.25s ease;
`;

export const LeftGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const NavLink = styled(Link)`
  font-weight: 500;
  text-decoration: none;
  color: var(--text);
  font-size: 0.95rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const ThemeButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  background: transparent;
  color: var(--text);
  transition: 0.2s;
  font-size: 0.9rem;

  &:hover {
    background: var(--bg);
  }
`;