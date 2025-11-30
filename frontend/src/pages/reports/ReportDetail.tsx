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
//  image?: string | null;
// updated_at?: string;
};

export default function ReportDetail() {
  const { protocolo } = useParams();
  const [r, setR] = useState<Denuncia | null>(null);

  useEffect(() => {
    async function load() { 
      let found;
      let itemFromLocalStorage = null;

      const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];
      itemFromLocalStorage = arr.find((x) => x.protocolo === protocolo) || null;
      found = itemFromLocalStorage;
      
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

     
      </Container>
    </Layout>
  );
}
