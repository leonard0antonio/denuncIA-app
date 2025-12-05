import { useEffect, useState } from "react";
import api from "../../api/client";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import { FiMap, FiLayers } from "react-icons/fi";

type Denuncia = {
  protocolo: string;
  categoria: string;
  descricao: string;
  status: string;
};

type Cluster = {
  cluster_id: number;
  count: number;
  reports: Denuncia[];
};

export default function NearbyReports() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<Cluster[]>("api/denuncias/agrupadas/")
      .then((res) => setClusters(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <FiMap /> Grupos de Denúncias Próximas (Raio 10km)
      </h2>

      {loading && <p>Analisando proximidade...</p>}

      {clusters.map((cluster) => (
        <div key={cluster.cluster_id} style={{ 
            marginBottom: 20, 
            background: "var(--card)", 
            padding: 16, 
            borderRadius: 12, 
            border: "1px solid var(--border)" 
        }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--primary)" }}>
            <FiLayers /> Grupo #{cluster.cluster_id} — {cluster.count} Ocorrência(s) próxima(s)
          </h3>
          
          <div style={{ marginTop: 10, paddingLeft: 10, borderLeft: "3px solid #eee" }}>
            {cluster.reports.map((d) => (
              <div key={d.protocolo} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: "1px dashed #eee" }}>
                <strong>{d.categoria}</strong> <br />
                <span style={{ fontSize: "0.9em", color: "#666" }}>{d.descricao}</span> <br />
                <Link to={`/denuncias/${d.protocolo}`} style={{ color: "var(--primary)", fontSize: "0.85em", fontWeight: "bold" }}>
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!loading && clusters.length === 0 && <p>Nenhuma denúncia cadastrada.</p>}
    </Layout>
  );
}