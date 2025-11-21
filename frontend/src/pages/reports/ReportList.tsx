// src/pages/reports/ReportList.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`background: var(--card); padding:12px; border-radius:8px; margin-bottom:12px;`;

export default function ReportList() {
  const [data,setData] = useState<any[]>([]);

  useEffect(()=> {
    const arr = JSON.parse(localStorage.getItem('denuncias') || '[]');
    setData(arr.reverse());
  },[]);

  return (
    <Layout>
      <h2>Denúncias (locais)</h2>
      {data.length === 0 && <p>Nenhuma denúncia criada localmente.</p>}
      {data.map(d=> (
        <Link key={d.id} to={`/reports/${d.id}`} style={{textDecoration:'none'}}>
          <Card>
            <strong>{d.title}</strong>
            <p style={{color:'var(--muted)'}}>{d.description}</p>
            <small>Protocolo: {d.protocol}</small>
          </Card>
        </Link>
      ))}
    </Layout>
  );
}
