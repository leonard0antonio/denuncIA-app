import React, { type ReactNode } from 'react';
import Header from './Header';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 24px auto;
  padding: 12px;
`;

export default function Layout({ children, toggleTheme, isDark }: { children: ReactNode, toggleTheme?: ()=>void, isDark?: boolean }) {
  return (
    <>
      <Header toggleTheme={toggleTheme || (()=>{})} isDark={!!isDark} />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
