import { type ReactNode } from "react";
import { Container } from "../styles/layout.styles"; 

export default function Layout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}