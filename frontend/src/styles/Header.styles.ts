import styled from "styled-components";
import { Link } from "react-router-dom";

export const Bar = styled.header`
  background: var(--card);
  padding: 12px 16px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  display:flex;
  justify-content:space-between;
  align-items:center;
`;

export const LeftGroup = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
`;

export const Nav = styled.nav`
  display:flex;
  gap:12px;
  align-items:center;
`;

export const NavLink = styled(Link)`
  font-weight: 500;
  text-decoration: none;
  color: var(--text);

  &:hover {
    opacity: 0.8;
  }
`;

export const ThemeButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: var(--muted);
  color: var(--text);
  transition: 0.2s;

  &:hover {
    background: var(--text);
    color: var(--bg);
  }
`;
