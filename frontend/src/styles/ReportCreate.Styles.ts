import styled from "styled-components";

export const Container = styled.div`
  background: var(--card);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.08);
`;

export const Title = styled.h3`
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  background: var(--bg);
  color: var(--text-primary);
  font-size: 15px;

  &:focus {
    outline: 2px solid var(--primary);
    border-color: transparent;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  min-height: 110px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  background: var(--bg);
  color: var(--text-primary);
  font-size: 15px;
  resize: vertical;

  &:focus {
    outline: 2px solid var(--primary);
    border-color: transparent;
  }
`;

export const Section = styled.div`
  margin: 16px 0;
`;

export const MapTitle = styled.strong`
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
`;

export const Button = styled.button`
  padding: 12px 18px;
  background: var(--primary);
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: .9;
  }
`;
