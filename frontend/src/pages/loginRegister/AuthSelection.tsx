import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 30px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const SelectionCard = styled(Link)`
  background: var(--card);
  border: 1px solid var(--border);
  padding: 40px;
  border-radius: 16px;
  width: 250px;
  text-decoration: none;
  color: var(--text);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
  }

  h2 {
    font-size: 1.5rem;
    color: var(--primary);
  }

  p {
    color: var(--muted);
    font-size: 0.95rem;
  }
`;

export default function AuthSelection() {
  return (
    <Container>
      <Title>Bem-vindo ao DenuncIA</Title>
      <p style={{marginBottom: 20, fontSize: "1.1rem", color: "var(--muted)"}}>
        Como você deseja acessar o sistema?
      </p>
      
      <CardContainer>
        <SelectionCard to="/login/citizen">
          <h2>👤 Cidadão</h2>
          <p>Quero fazer denúncias e acompanhar problemas na minha cidade.</p>
        </SelectionCard>
        <SelectionCard to="/login/gestor">
          <h2>👔 Gestor Público</h2>
          <p>Sou um oficial e preciso gerenciar e atualizar as ocorrências.</p>
        </SelectionCard>
      </CardContainer>
    </Container>
  );
}