import { ShieldCheck, Info, LinkIcon } from "lucide-react";
import {
  Wrapper,
  Content, 
  Grid,
  Section,
  Title,
  Text,
  List,
  Item,
  FooterLink,
  Bottom,
} from "../styles/Footer.sttyles";

export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <Grid>
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
      </Content>
    </Wrapper>
  );
}