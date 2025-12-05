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
  status?: string;
  foto?: string | null;
};

export default function ReportDetail() {
  const { protocolo } = useParams();
  const [r, setR] = useState<Denuncia | null>(null);

  useEffect(() => {
    async function load() { 
      try{
        const response = await api.get(`api/denuncias/${protocolo}/`);
        setR(response.data);
      } catch (error) {
        console.error("Erro ao carregar denúncia:", error);
      }
    }
    load();
  }, [protocolo]);

  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("data:") || path.startsWith("http")) return path;
    return `http://localhost:8000${path}`;
  };

  return (
    <Layout>
      <Container>
        <Title>{r?.categoria}</Title>

        <Text>{r?.descricao}</Text>

        <Text>
          <Label>Protocolo:</Label> {r?.protocolo}
        </Text>

        <Text>
          <Label>Status:</Label> 
          <span style={{
              marginLeft: 8, 
              padding: "4px 8px", 
              borderRadius: "4px",
              background: "var(--primary)", 
              color: "white",
              fontSize: "0.9em",
              fontWeight: "bold"
          }}>
            {r?.status || "Em análise"}
          </span>
        </Text>

        <Text>
          <Label>Local:</Label> {r?.latitude}, {r?.longitude}
        </Text>

        {r?.foto && (
          <ImageBox>
            <Image 
              src={getImageUrl(r.foto)} 
              alt={`Foto da denúncia`} 
              onError={(e) => e.currentTarget.style.display = 'none'}
            />
          </ImageBox>
        )}
        
      </Container>
    </Layout>
  );
}