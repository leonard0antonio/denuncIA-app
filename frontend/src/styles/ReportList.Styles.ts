import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h2`
  color: var(--text-primary);
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

export const Empty = styled.p`
  color: var(--text-secondary);
  font-size: 16px;
  margin-top: 10px;
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Card = styled.div`
  background: var(--card);
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 14px;
  border: 1px solid rgba(0,0,0,0.1);
  transition: 0.15s;

  &:hover {
    background: var(--card-hover);
    transform: translateY(-2px);
    box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  }
`;

export const CardTitle = styled.strong`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 18px;
`;

export const CardDesc = styled.p`
  color: var(--text-secondary);
  margin: 6px 0 6px 0;
  font-size: 15px;
`;

export const Protocol = styled.small`
  color: var(--muted);
  font-size: 13px;
`;
