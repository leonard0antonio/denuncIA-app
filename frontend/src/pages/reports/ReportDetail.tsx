import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../component/Layout";

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const [r, setR] = useState<any>(null);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("denuncias") || "[]");
    setR(arr.find((x: any) => x.id === id) || null);
  }, [id]);

  if (!r)
    return (
      <Layout>
        <div>Denúncia não encontrada.</div>
      </Layout>
    );

  return (
    <Layout>
      <h2>{r.title}</h2>
      <p>{r.description}</p>
      <p>
        <strong>Protocolo:</strong> {r.protocol}
      </p>
      <p>
        <strong>Local:</strong> {r.lat}, {r.lng}
      </p>
      {r.image ? (
        <img
          src={r.image}
          alt="foto"
          style={{ maxWidth: 800, borderRadius: 8 }}
        />
      ) : null}
    </Layout>
  );
}
