import { useState } from "react";
import Layout from "../../component/Layout";
import Map from "../../component/Map";
import ImageUpload from "../../component/ImageUpload";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Card = styled.div`background:var(--card);padding:16px;border-radius:12px;`;

export default function ReportCreate() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pos, setPos] = useState<[number,number] | null>(null);
  const [image, setImage] = useState<string | null>(null);

  function saveLocal() {
    if (!title || !desc || !pos) return alert("Preencha título, descrição e marque no mapa.");
    const rpt = {
      id: uuidv4(),
      title, description: desc,
      lat: pos[0], lng: pos[1],
      image,
      protocol: uuidv4(),
      created_at: new Date().toISOString()
    };
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    arr.push(rpt);
    localStorage.setItem("denuncias", JSON.stringify(arr));
    alert("Denúncia salva localmente: " + rpt.protocol);
    setTitle(""); setDesc(""); setPos(null); setImage(null);
  }

  return (
    <Layout>
      <Card>
        <h3>Nova Denúncia (local)</h3>
        <input placeholder="Título" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea placeholder="Descrição" value={desc} onChange={(e)=>setDesc(e.target.value)} />
        <div style={{marginTop:8, marginBottom:8}}>
          <strong>Marque no mapa</strong>
          <Map position={pos} onChange={(lat,lng)=>setPos([lat,lng])} />
        </div>
        <ImageUpload onChange={(b)=>setImage(b)} />
        <div style={{marginTop:12}}>
          <button onClick={saveLocal} style={{padding:'10px 14px', background:'var(--primary)', color:'#fff', borderRadius:8}}>Salvar denúncia</button>
        </div>
      </Card>
    </Layout>
  );
}
