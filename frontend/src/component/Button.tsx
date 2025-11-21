import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButton = styled.button`
  padding: 10px 16px;
  background: #0066ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
`;

export const Button = ({ to, children }: { to?: string; children: React.ReactNode }) => {
  if (to) return <Link to={to}><StyledButton>{children}</StyledButton></Link>;
  return <StyledButton>{children}</StyledButton>;
};
