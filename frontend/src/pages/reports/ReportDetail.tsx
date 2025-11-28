import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout";

import {
  Container,
  Title,
  Text,
  Label,
  ImageBox,
  Image,
} from "../../styles/ReportDetail.Styles";

type Denuncia = {
  id: string;
  title: string;
  description: string;
  protocol: string;
  lat: number;
  lng: number;
  image?: string | null;
  updated_at?: string;
};

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const [r, setR] = useState<Denuncia | null>(null);

  useEffect(() => {
    function load() {
      const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];
      const found = arr.find((x) => x.id === id) || null;
      setR(found);
    }

    load();
  }, [id]);

  if (!r)
    return (
      <Layout>
        <Container>
          <Title>Denúncia não encontrada</Title>
          <Text>O registro solicitado não existe ou foi removido.</Text>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <Title>{r.title}</Title>

        <Text>{r.description}</Text>

        <Text>
          <Label>Protocolo:</Label> {r.protocol}
        </Text>

        <Text>
          <Label>Local:</Label> {r.lat}, {r.lng}
        </Text>

        {r.image ? (
          <ImageBox>
            <Image src={r.image} alt="foto da denúncia" />
          </ImageBox>
        ) : null}
      </Container>
    </Layout>
  );
}
