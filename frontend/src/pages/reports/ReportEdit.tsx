import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";
import ImageUpload from "../../component/ImageUpload";
import Map from "../../component/Map";

import {
  Card,
  Title,
  Field,
  Label,
  Input,
  TextArea,
  SaveButton
} from "../../styles/ReportEdit.Styles";

export default function ReportEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [pos, setPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    const item = arr.find((x: any) => x.id === id);
    if (!item) return;

    setData(item);
    setTitle(item.title);
    setDesc(item.description);
    setPos([item.lat, item.lng]);
    setImage(item.image || null);
  }, [id]);

  function update() {
    if (!title || !desc || !pos)
      return alert("Preencha todos os campos.");

    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    const index = arr.findIndex((x: any) => x.id === id);
    if (index === -1) return;

    arr[index] = {
      ...arr[index],
      title,
      description: desc,
      lat: pos[0],
      lng: pos[1],
      image,
      updated_at: new Date().toISOString()
    };

    localStorage.setItem("denuncias", JSON.stringify(arr));
    alert("Denúncia atualizada.");
    navigate(`/reports/${id}`);
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
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>

        <Field>
          <Label>Descrição</Label>
          <TextArea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Localização</Label>
          <Map position={pos} onChange={(lat, lng) => setPos([lat, lng])} />
        </Field>

        <Field>
          <Label>Imagem</Label>
          <ImageUpload onChange={setImage} initial={image} />
        </Field>

        <SaveButton onClick={update}>Salvar alterações</SaveButton>
      </Card>
    </Layout>
  );
}
