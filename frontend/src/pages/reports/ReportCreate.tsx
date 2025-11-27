import { useState } from "react";
import Layout from "../../component/Layout";
import Map from "../../component/Map";
import ImageUpload from "../../component/ImageUpload";
import { v4 as uuidv4 } from "uuid";

import {
  Container,
  Title,
  Input,
  TextArea,
  Section,
  MapTitle,
  Button,
} from "../../styles/ReportCreate.Styles";

export default function ReportCreate() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [image, setImage] = useState<string | null>(null);

  function saveLocal() {
    if (!title || !desc || !pos)
      return alert("Preencha título, descrição e marque no mapa.");

    const rpt = {
      id: uuidv4(),
      title,
      description: desc,
      lat: pos[0],
      lng: pos[1],
      image,
      protocol: uuidv4(),
      created_at: new Date().toISOString(),
    };

    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    arr.push(rpt);
    localStorage.setItem("denuncias", JSON.stringify(arr));

    alert("Denúncia salva localmente. Protocolo: " + rpt.protocol);

    setTitle("");
    setDesc("");
    setPos(null);
    setImage(null);
  }

  return (
    <Layout>
      <Container>
        <Title>Nova Denúncia</Title>

        <Input
          placeholder="Título da denúncia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextArea
          placeholder="Descrição detalhada"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <Section>
          <MapTitle>Marque no mapa o local da ocorrência</MapTitle>
          <Map position={pos} onChange={(lat, lng) => setPos([lat, lng])} />
        </Section>

        <Section>
          <ImageUpload onChange={(b) => setImage(b)} />
        </Section>

        <Button onClick={saveLocal}>Salvar Denúncia</Button>
      </Container>
    </Layout>
  );
}
