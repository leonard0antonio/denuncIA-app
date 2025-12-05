import Layout from "../component/Layout";
import Footer from "../component/Footer";
import {
  Wrapper,
  Hero,
  HeroImg,
  HeroText,
  Title,
  Subtitle,
  ButtonLink,
  ActionButton,
  SectionTitle,
  Cards,
  Card,
  CardText,
  CardTitle,
} from "../styles/Home.Styles";

import { FileWarning, MapPin, Camera, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <Layout>
        <Wrapper>
          <Hero>
            <HeroImg src="/Public/official-logo.png" alt="Logo Oficial" />

            <HeroText>
              <Title>Denuncie problemas urbanos</Title>
              <Subtitle>
                Ajude a cidade enviando denúncias de forma rápida e segura. Todas
                as denúncias recebem um protocolo para acompanhamento.
              </Subtitle>

              <ButtonLink to="/reports/new">
                <ActionButton>Fazer uma denúncia</ActionButton>
              </ButtonLink>
            </HeroText>
          </Hero>

          <div>
            <SectionTitle>Como funciona?</SectionTitle>

            <Cards>
              <Card>
                <CardTitle>
                  <FileWarning size={20} /> Descreva o problema
                </CardTitle>
                <CardText>
                  Informe o tipo de ocorrência, título e descrição detalhada.
                </CardText>
              </Card>

              <Card>
                <CardTitle>
                  <MapPin size={20} /> Marque no mapa
                </CardTitle>
                <CardText>
                  Localize exatamente onde o problema está acontecendo.
                </CardText>
              </Card>

              <Card>
                <CardTitle>
                  <Camera size={20} /> Envie uma foto
                </CardTitle>
                <CardText>
                  Envie uma imagem opcional para ajudar na análise.
                </CardText>
              </Card>

              <Card>
                <CardTitle>
                  <ShieldCheck size={20} /> Receba o protocolo
                </CardTitle>
                <CardText>
                  A denúncia gera um número único para acompanhamento.
                </CardText>
              </Card>
            </Cards>
          </div>

          <section style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
              Por que registrar uma denúncia?
            </h2>

            <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
              Sua participação ajuda a melhorar a cidade. Cada denúncia gera um
              protocolo oficial que é encaminhado aos órgãos responsáveis,
              garantindo transparência e acompanhamento do caso.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: "var(--card)",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <h3 style={{ marginBottom: "8px" }}>✔ Transparência</h3>
                <p style={{ color: "var(--muted)" }}>
                  Você recebe um número de protocolo e pode consultar o andamento
                  a qualquer momento.
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <h3 style={{ marginBottom: "8px" }}>✔ Ação rápida</h3>
                <p style={{ color: "var(--muted)" }}>
                  As denúncias são enviadas diretamente aos setores corretos,
                  agilizando o atendimento.
                </p>
              </div>

              <div
                style={{
                  background: "var(--card)",
                  padding: "18px",
                  borderRadius: "12px",
                }}
              >
                <h3 style={{ marginBottom: "8px" }}>✔ Melhoria contínua</h3>
                <p style={{ color: "var(--muted)" }}>
                  Dados ajudando o governo a mapear problemas e priorizar
                  melhorias urbanas.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "40px" }}>
              <h2 style={{ fontSize: "22px", marginBottom: "16px" }}>
                Compromisso com a população
              </h2>
              <p style={{ color: "var(--muted)" }}>
                Este sistema faz parte do compromisso de promover uma cidade mais
                segura, organizada e acessível. O governo trabalha com
                responsabilidade e transparência para garantir que todas as
                denúncias sejam tratadas com seriedade.
              </p>
            </div>
          </section>
        </Wrapper>
      </Layout>
      
      <Footer />
    </>
  );
}