import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Input = styled.input`
  display: none;
`;

export const Area = styled.label`
  border: 2px dashed var(--muted);
  padding: 14px;
  border-radius: 10px;
  background: var(--card);
  text-align: center;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  color: var(--text);
  font-weight: 500;
  user-select: none;

  &:hover {
    border-color: var(--primary);
    background: rgba(0,0,0,0.03);
  }
`;

export const Preview = styled.img`
  max-width: 300px;
  margin-top: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.06);
`;
