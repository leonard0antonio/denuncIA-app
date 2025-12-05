import styled from "styled-components";

export const Container = styled.div`
  background: var(--card);
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.1);
`;

export const Title = styled.h2`
  color: var(--text); 
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 600;
`;

export const Text = styled.p`
  color: var(--muted);
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 14px;
  display: flex; 
  align-items: center;
  gap: 8px;
`;

export const Label = styled.strong`
  color: var(--text);
  font-weight: 600;
`;

export const ImageBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 500px;
  border-radius: 10px;
  border: 1px solid #ddd;
`;

export const StatusSelect = styled.select<{ status: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  border: none;
  cursor: pointer;
  appearance: none; 
  text-align: center;
  transition: 0.2s ease-in-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  background-color: ${({ status }) => {
    switch (status) {
      case "Resolvido": return "#2e7d32"; 
      case "Rejeitado": return "#c62828"; 
      default: return "#f9a825"; 
    }
  }};

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }

  &:focus {
    outline: 3px solid rgba(0,0,0,0.1);
  }

  option {
    background-color: #fff;
    color: #333;
    font-weight: 500;
    padding: 10px;
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  background-color: ${({ status }) => {
    switch (status) {
      case "Resolvido": return "#2e7d32";
      case "Rejeitado": return "#c62828";
      default: return "#f9a825";
    }
  }};
`;