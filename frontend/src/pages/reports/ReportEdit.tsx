import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";
import Map from "../../component/Map";
import api from "../../api/client";
import { Card, Title, Field, Label, Input, TextArea, Select, SaveButton } from "../../styles/ReportEdit.Styles";
import { v4 as uuidv4 } from "uuid";

type Denuncia = {
  protocolo: string;
  categoria: string;
  descricao: string;
  latitude: number;
  longitude: number;
  status?: string;
  foto?: string | null;
};

export default function ReportEdit() {
  const { protocolo } = useParams();
  const navigate = useNavigate();
  
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Em análise");
  const [pos, setPos] = useState<[number, number] | null>(null);
  
  const isGestor = localStorage.getItem("userType") === "gestor";
  const protocoloUUID = uuidv4();

  useEffect(() => {
   async function load() {
      try {
        const response = await api.get(`api/denuncias/${protocolo}/`);
        const item = response.data as Denuncia;
        setCategoria(item.categoria);
        setDescricao(item.descricao);
        setPos([item.latitude, item.longitude]);
        setStatus(item.status || "Em análise");    
      } catch(e) {
          console.error("Erro ao carregar", e);
      }
    }
    load();
  }, [protocolo]);

  async function update() {
    if (!categoria || !descricao || !pos) return alert("Preencha todos os campos.");

    try {
        const formData = new FormData();
        
        formData.append("protocolo", protocoloUUID);
        formData.append("categoria", categoria);
        formData.append("descricao", descricao);
        formData.append("latitude", String(pos[0]));
        formData.append("longitude", String(pos[1]));
        formData.append("status", status);

        await api.put(`api/denuncias/edit/${protocolo}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Alterações salvas com sucesso!");
        navigate(`/denuncias/${protocolo}`);
        
    } catch (error: any) {
        console.error("Erro ao atualizar", error);
        const msg = error.response?.data ? JSON.stringify(error.response.data) : "Verifique sua conexão.";
        alert("Erro ao salvar: " + msg);
    }
  }

  return (
    <Layout>
      <Card>
        <Title>{isGestor ? "Gerenciar Denúncia (Gestor)" : "Editar Minha Denúncia"}</Title>

        {isGestor && (
            <Field>
            <Label>Alterar Status da Ocorrência</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Em análise">🟡 Em análise</option>
                <option value="Resolvido">🟢 Resolvido</option>
                <option value="Rejeitado">🔴 Rejeitado</option>
            </Select>
            </Field>
        )}

        <Field>
            <Label>Título</Label>
            <Input 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value)} 
                disabled={isGestor} 
                title={isGestor ? "Apenas o autor pode editar o título" : ""}
            />
        </Field>

        <Field>
            <Label>Descrição</Label>
            <TextArea 
                value={descricao} 
                onChange={(e) => setDescricao(e.target.value)} 
                disabled={isGestor} 
                title={isGestor ? "Apenas o autor pode editar a descrição" : ""}
            />
        </Field>

        <Field>
            <Label>Localização</Label>
            <div style={isGestor ? {pointerEvents: 'none', opacity: 0.7} : {}}>
                <Map 
                    position={pos} 
                    onChange={(lat, lng) => !isGestor && setPos([lat, lng])} 
                />
            </div>
        </Field>
        
        <SaveButton onClick={update}>Salvar Alterações</SaveButton>
      </Card>
    </Layout>
  );
}