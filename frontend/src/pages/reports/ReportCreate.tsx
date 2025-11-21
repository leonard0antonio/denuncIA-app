// src/pages/reports/ReportCreate.tsx
import React, { useState } from 'react';
import Layout from '../../component/Layout';
import ImageUpload from '../../component/ImageUpload';
import Map from '../../component/Map';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Card = styled.div`background: var(--card); padding:16px; border-radius:12px;`;

type LocalReport = {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  image?: string | null;
  protocol: string;
  created_at: string;
};

export default function ReportCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pos, setPos] = useState<[number,number] | null>(null);
  const [image, setImage] = useState<string | null>(null);

  function saveLocal(r: LocalReport) {
    const arr = JSON.parse(localStorage.getItem('denuncias') || '[]');
    arr.push(r);
    localStorage.setItem('denuncias', JSON.stringify(arr));
  }

  function handleSubmit() {
    if (!title || !description || !pos) return alert('Preencha título, descrição e marque a localização no mapa.');
    const rpt: LocalReport = {
      id: uuidv4(),
      title,
      description,
      lat: pos[0],
      lng: pos[1],
      image: image || null,
      protocol: uuidv4(),
      created_at: new Date().toISOString()
    };
    saveLocal(rpt);
    alert('Denúncia salva localmente. Protocolo: ' + rpt.protocol);
    // limpar
    setTitle(''); setDescription(''); setPos(null); setImage(null);
  }

  return (
    <Layout>
      <Card>
        <h3>Nova Denúncia (local)</h3>
        <input placeholder="Título" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <div style={{marginTop:8, marginBottom:8}}>
          <strong>Marque no mapa:</strong>
          <Map position={pos} onChange={(lat,lng)=>setPos([lat,lng])} />
        </div>
        <ImageUpload onChange={(b)=>setImage(b)} />
        <div style={{marginTop:12}}>
          <button onClick={handleSubmit} style={{padding:'10px 14px', background:'var(--primary)', color:'#fff', borderRadius:8}}>Salvar denúncia</button>
        </div>
      </Card>
    </Layout>
  );
}
