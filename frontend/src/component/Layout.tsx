import type { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
