import styled from "styled-components";

export const Card = styled.div`
  background: var(--card);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border);
  max-width: 650px;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
`;

export const Field = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text);
`;

export const Input = styled.input`
  border: 1px solid var(--border);
  padding: 12px;
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  border: 1px solid var(--border);
  padding: 12px;
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 1rem;
  cursor: pointer;
  appearance: none; 
  background-image: linear-gradient(45deg, transparent 50%, var(--text) 50%),
                    linear-gradient(135deg, var(--text) 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
                       calc(100% - 15px) calc(1em + 2px);
  background-size: 5px 5px,
                   5px 5px;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid var(--border);
  padding: 12px;
  border-radius: 8px;
  height: 120px;
  background: var(--bg);
  color: var(--text);
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SaveButton = styled.button`
  margin-top: 10px;
  padding: 14px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  font-size: 1rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;