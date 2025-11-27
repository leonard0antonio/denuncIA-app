import { type ReactNode } from "react";
import { Wrapper } from "../styles/ImageUpload.styles";

export default function Layout({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}
