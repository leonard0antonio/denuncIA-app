import { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";

export default function ReportList(){
  const [data,setData] = useState<any[]>([]);
  useEffect(()=> {
    const arr = JSON.parse(localStorage.getItem('denuncias') || '[]');
    setData(arr.reverse());
  }, []);
  return (
    <Layout>
      <h2>Denúncias locais</h2>
      {data.length === 0 && <p>Nenhuma denúncia local.</p>}
      {data.map(d=> (
        <Link key={d.id} to={`/reports/${d.id}`} style={{textDecoration:'none'}}>
          <div style={{background:'var(--card)',padding:12,borderRadius:8,marginBottom:12}}>
            <strong>{d.title}</strong>
            <p style={{color:'var(--muted)'}}>{d.description || d.description}</p>
            <small>Protocolo: {d.protocol}</small>
          </div>
        </Link>
      ))}
    </Layout>
  );
}
