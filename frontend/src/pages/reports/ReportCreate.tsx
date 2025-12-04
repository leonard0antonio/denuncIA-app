import { useState } from "react";
import Layout from "../../component/Layout";
import Map from "../../component/Map";
import ImageUpload from "../../component/ImageUpload";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/client";

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
  const [categoria, setCategoria] = useState("");
  const [desc, setDesc] = useState("");
  const [localizacao, setLocalizacao] = useState<[number, number] | null>(null);
  const [foto, setFoto] = useState<string | null>(null);

  function dataURItoBlob(dataURI: string) {
    const split = dataURI.split(',');
    const byteString = atob(split[1]);
    const mimeString = split[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  async function saveLocal() {
    if (!categoria || !desc || !localizacao)
      return alert("Preencha título, descrição e marque no mapa.");

    const protocoloUUID = uuidv4();
    const dataCriacao = new Date().toISOString();

    const rptLocal = {
      protocolo: protocoloUUID,
      categoria,
      descricao: desc,
      latitude: localizacao[0],
      longitude: localizacao[1],
      foto, 
      status: 'Em análise',
      created_at: dataCriacao,
    };

    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    arr.push(rptLocal);
    localStorage.setItem("denuncias", JSON.stringify(arr));

    try {
      const formData = new FormData();
      formData.append("protocolo", protocoloUUID);
      formData.append("categoria", categoria);
      formData.append("descricao", desc);
      formData.append("latitude", String(localizacao[0]));
      formData.append("longitude", String(localizacao[1]));
      formData.append("status", "Em análise");
      
      if (foto) {
        const blob = dataURItoBlob(foto);
        formData.append("foto", blob, "foto_denuncia.jpg");
      }

      await api.post("api/denuncias/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Denúncia enviada com sucesso!");

      setCategoria("");
      setDesc("");
      setLocalizacao(null);
      setFoto(null);

    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar para o servidor, verifique a conexão.");
    }
  }

  return (
    <Layout>
      <Container>
        <Title>Nova Denúncia</Title>

        <Input
          placeholder="Título da denúncia"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <TextArea
          placeholder="Descrição detalhada"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <Section>
          <MapTitle>Foto do local (Opcional)</MapTitle>
          <ImageUpload onChange={setFoto} initial={foto} />
        </Section>

        <Section>
          <MapTitle>Marque no mapa o local da ocorrência</MapTitle>
          <Map 
            position={localizacao} 
            onChange={(latitude, longitude) => setLocalizacao([latitude, longitude])} 
          />
        </Section>

        <Button onClick={saveLocal}>Salvar Denúncia</Button>
      </Container>
    </Layout>
  );
}