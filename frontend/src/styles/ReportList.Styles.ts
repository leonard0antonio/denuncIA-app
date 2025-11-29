// --- EXISTENTES (não alterei nada) ---
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
  gap: 10px;

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

export const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CardIcon = styled.div`
  background: var(--primary);
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

// --- 🔥 AQUI COMEÇA O NOVO PARA EDITAR/EXCLUIR ---

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
`;

export const ActionBtn = styled.button<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #fff;

  background: ${({ danger }) => (danger ? "var(--danger)" : "var(--primary)")};
  transition: 0.2s ease;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;
