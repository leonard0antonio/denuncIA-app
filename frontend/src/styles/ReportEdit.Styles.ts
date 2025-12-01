import styled from "styled-components";

export const Card = styled.div`
  background: var(--card);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--border);
  max-width: 750px;
  margin: auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 18px;
`;

export const Field = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: var(--text);
`;

export const Input = styled.input`
  border: 1px solid var(--border);
  padding: 10px;
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
`;

export const TextArea = styled.textarea`
  border: 1px solid var(--border);
  padding: 10px;
  border-radius: 8px;
  height: 120px;
  background: var(--bg);
  color: var(--text);
`;

export const SaveButton = styled.button`
  margin-top: 12px;
  padding: 12px 14px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
`;
