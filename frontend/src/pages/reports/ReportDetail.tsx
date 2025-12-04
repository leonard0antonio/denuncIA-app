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
import api from "../../api/client";

type Denuncia = {
  protocolo: string;
  categoria: string;
  descricao: string;
  latitude: number;
  longitude: number;
  foto?: string | null; // Alterado de 'image' para 'foto' para corresponder ao backend
};

export default function ReportDetail() {
  const { protocolo } = useParams();
  const [r, setR] = useState<Denuncia | null>(null);

  useEffect(() => {
    async function load() { 
      let found: Denuncia | null = null;

      // 1. Tenta buscar do LocalStorage (onde 'foto' estaria em Base64)
      const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];
      const itemFromLocalStorage = arr.find((x) => x.protocolo === protocolo) || null;
      found = itemFromLocalStorage;
      
      // 2. Se não estiver no LocalStorage, busca da API (onde 'foto' virá como URL)
      if (found == null){
          try{
            const response = await api.get(`api/denuncias/${protocolo}/`);
            found = response.data as Denuncia;
          } catch (error) {
            console.error("Erro ao carregar denúncia:", error);
          }
      };

     setR(found)

    }

    load();
  }, [protocolo]);                                    


  return (
    <Layout>
      <Container>
        <Title>{r?.categoria}</Title>

        <Text>{r?.descricao}</Text>

        <Text>
          <Label>Protocolo:</Label> {r?.protocolo}
        </Text>

        <Text>
          <Label>Local:</Label> {r?.latitude}, {r?.longitude}
        </Text>

        {r?.foto && (
          <ImageBox>
            <Image src={r.foto} alt={`Foto da denúncia ${r.categoria}`} />
          </ImageBox>
        )}
        
      </Container>
    </Layout>
  );
}