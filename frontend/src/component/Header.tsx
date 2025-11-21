import React from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Bar = styled.header`
  width: 100%;
  padding: 12px 16px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background: var(--card);
  box-shadow: 0 1px 8px rgba(0,0,0,0.05);
`;

export default function Header({ toggleTheme, isDark }: { toggleTheme: ()=>void; isDark: boolean }) {
  return (
    <Bar>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <Link to="/" style={{textDecoration:'none', color:'var(--text)', fontWeight:700}}>DenuncIA</Link>
        <Link to="/reports" style={{textDecoration:'none'}}>Denúncias</Link>
      </div>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <Link to="/reports/new">Nova</Link>
        <ThemeToggle onToggle={toggleTheme} isDark={isDark} />
      </div>
    </Bar>
  );
}
