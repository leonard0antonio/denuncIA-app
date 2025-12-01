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


export default  function ReportCreate() {
  const [categoria, setCategoria] = useState("");
  const [desc, setDesc] = useState("");
  const [localizacao, setLocalizacao] = useState<[number, number] | null>(null);
  //const [foto, setFoto] = useState<string | null>(null);

  async function saveLocal() {
    if (!categoria || !desc || !localizacao)
      return alert("Preencha título, descrição e marque no mapa.");


   
    const rpt = {
      protocolo: uuidv4(),
      categoria,
      descricao: desc,
      latitude: localizacao[0],
      longitude: localizacao[1], //EssE METodo permite limitar as casas decimais
     // foto,
      status: 'Em análise',
      created_at: new Date().toISOString(),
    };

    console.log(rpt)

    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    arr.push(rpt);
    localStorage.setItem("denuncias", JSON.stringify(arr));

    await api.post("api/denuncias/", rpt)


    setCategoria("");
    setDesc("");
    setLocalizacao(null);
    //setFoto(null);
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
          <MapTitle>Marque no mapa o local da ocorrência</MapTitle>
          <Map position={localizacao} onChange={(latitude, longitude) => setLocalizacao([latitude, longitude])} />
        </Section>



        <Button onClick={saveLocal}>Salvar Denúncia</Button>
      </Container>
    </Layout>
  );
}
