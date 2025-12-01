import styled from "styled-components";

export const Card = styled.div`
  background: var(--card);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
  max-width: 600px;
  margin: auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 14px;
`;

export const Text = styled.p`
  color: var(--text);
  font-size: 16px;
  margin-bottom: 22px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const Confirm = styled.button`
  background: #c62828;
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  flex: 1;
`;

export const Cancel = styled.button`
  background: var(--muted);
  color: var(--text);
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  flex: 1;
`;
