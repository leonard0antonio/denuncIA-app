// src/pages/reports/ReportDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../component/Layout';

export default function ReportDetail() {
  const { id } = useParams<{id:string}>();
  const [r, setR] = useState<any>(null);

  useEffect(()=> {
    const arr = JSON.parse(localStorage.getItem('denuncias') || '[]');
    const found = arr.find((x:any)=> x.id === id);
    setR(found || null);
  },[id]);

  if(!r) return <Layout><div>Denúncia não encontrada.</div></Layout>;

  return (
    <Layout>
      <h2>{r.title}</h2>
      <p>{r.description}</p>
      <p><strong>Protocolo:</strong> {r.protocol}</p>
      <p><strong>Local:</strong> {r.lat.toFixed(6)}, {r.lng.toFixed(6)}</p>
      {r.image ? <img src={r.image} style={{maxWidth:800,borderRadius:8}} alt="foto" /> : <div>No image</div>}
      <div style={{marginTop:12}}>
        <small>Criado em: {new Date(r.created_at).toLocaleString()}</small>
      </div>
    </Layout>
  );
}
