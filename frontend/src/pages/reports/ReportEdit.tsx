import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";
import ImageUpload from "../../component/ImageUpload";
import Map from "../../component/Map";
import api from "../../api/client";

import {
  Card,
  Title,
  Field,
  Label,
  Input,
  TextArea,
  SaveButton
} from "../../styles/ReportEdit.Styles";
import { Protocol } from "../../styles/ReportList.Styles";

type Denuncia = {
  protocolo: string;
  categoria: string;
  descricao: string;
  latitude: number;
  longitude: number;
 //  image?: string | null; 
 };


export default function ReportEdit() {
  const { protocolo } = useParams();
  const navigate = useNavigate();
  console.log(protocolo)
  const [data, setData] = useState<Denuncia | null>(null);
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  //const [image, setImage] = useState<string | null>(null);
  const [pos, setPos] = useState<[number, number] | null>(null);

  useEffect(() => {
   async  function load() {
    let item;
      const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];
     item = arr.find((x) => x.protocolo === protocolo);

      if (!item){
        const response = await api.get(`api/denuncias/${protocolo}/`);
        item = response.data as Denuncia;
      };

      setData(item);
      setCategoria(item.categoria);
      setDescricao(item.descricao);
      setPos([item.latitude, item.longitude]);
     // setImage(item.image ?? null);
    }

    load();
  }, [protocolo]);

  async function update() {
    if (!categoria || !descricao || !pos)
      return alert("Preencha todos os campos.");

     const response = await api.get(`api/denuncias/${protocolo}/`);
     const found = response.data as Denuncia;

    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];
    let index = arr.findIndex((x) => x.protocolo === protocolo);

    if (index === -1){
      arr.push(found);
      index = arr.length -1;
    };

    const denunciaAtualizada = {
      ...arr[index],
      categoria,
      descricao: descricao,
      latitude: pos[0],
      longitude: pos[1],
    //  image,
      
    };

    arr[index] = denunciaAtualizada
    localStorage.setItem("denuncias", JSON.stringify(arr));
    //setData(denunciaAtualizada)
    alert("Denúncia atualizada.");
   await api.put(`api/denuncias/edit/${protocolo}/`, denunciaAtualizada)
    navigate(`/denuncias/${protocolo}`);
  }

  if (!data)
    return (
      <Layout>
        <div>Carregando...</div>
      </Layout>
    );

  return (
    <Layout>
      <Card>
        <Title>Editar denúncia</Title>

        <Field>
          <Label>Título</Label>
          <Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        </Field>

        <Field>
          <Label>Descrição</Label>
          <TextArea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </Field>

        <Field>
          <Label>Localização</Label>
          <Map position={pos} onChange={(latitude, longitude) => setPos([latitude, longitude])} />
        </Field>
        <SaveButton onClick={update}>Salvar alterações</SaveButton>
      </Card>
    </Layout>
  );
}
