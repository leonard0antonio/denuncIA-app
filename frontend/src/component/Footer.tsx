import styled from "styled-components";
import { ShieldCheck, Info, LinkIcon } from "lucide-react";

const Wrapper = styled.footer`
  margin-top: 50px;
  padding: 50px 20px;
  background: var(--card);
  border-top: 1px solid var(--border);
  color: var(--text);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div``;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Text = styled.p`
  color: var(--muted);
  margin-bottom: 10px;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 5px;
`;

const Item = styled.li`
  margin-bottom: 8px;
`;

const FooterLink = styled.a`
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Bottom = styled.div`
  margin-top: 40px;
  padding-top: 25px;
  border-top: 1px solid var(--border);
  font-size: 14px;
  color: var(--muted);
  text-align: center;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Grid>

        {/* Garantia de anonimato */}
        <Section>
          <Title>
            <ShieldCheck size={20} /> Garantia de anonimato
          </Title>
          <Text>
            Todas as denúncias são tratadas com total sigilo. Nenhuma informação
            pessoal é compartilhada ou registrada.
          </Text>
          <Text>
            O sistema foi projetado para proteção total da identidade do cidadão.
          </Text>
        </Section>

        {/* Informações institucionais */}
        <Section>
          <Title>
            <Info size={20} /> Informações institucionais
          </Title>
          <Text>
            Portal de denúncias urbanas destinado a facilitar a comunicação entre
            cidadãos e órgãos públicos.
          </Text>
          <Text>
            Transparência, acessibilidade e responsabilidade social.
          </Text>
        </Section>

        {/* Links úteis */}
        <Section>
          <Title>
            <LinkIcon size={20} /> Links úteis
          </Title>

          <List>
            <Item>
              <FooterLink href="https://www.gov.br" target="_blank">
                Portal do Governo Federal
              </FooterLink>
            </Item>
            <Item>
              <FooterLink href="https://ouvidoria.gov.br" target="_blank">
                Ouvidoria Geral da União
              </FooterLink>
            </Item>
            <Item>
              <FooterLink href="https://www.servicos.gov.br" target="_blank">
                Serviços Públicos Digitais
              </FooterLink>
            </Item>
            <Item>
              <FooterLink href="https://www.defesacivil.gov.br" target="_blank">
                Defesa Civil – Emergências
              </FooterLink>
            </Item>
          </List>
        </Section>

      </Grid>

      <Bottom>
        © {new Date().getFullYear()} Sistema de Denúncias Urbanas — Todos os direitos reservados.
      </Bottom>
    </Wrapper>
  );
}
