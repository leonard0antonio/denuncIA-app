import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
`;

export const Empty = styled.p`
  color: var(--muted);
  font-size: 16px;
  margin-top: 10px;
`;

export const ItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Card = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 20px;
  transition: 0.15s ease;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 6px;

  &:hover {
    background: var(--hover);
    transform: translateY(-1px);
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text);
`;

export const CardDesc = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
`;

export const Protocol = styled.small`
  margin-top: 5px;
  color: var(--primary);
  font-weight: 600;
`;
