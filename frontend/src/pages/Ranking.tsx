import { useEffect, useState } from "react";
import api from "../api/client";
import Layout from "../component/Layout";
import { Trophy } from "lucide-react";

type RankUser = {
  username: string;
  total_denuncias: number;
};

export default function Ranking() {
  const [ranking, setRanking] = useState<RankUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("api/ranking/")
      .then((res) => setRanking(res.data))
      .catch((err) => console.error("Erro", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div style={{ background: "var(--card)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <Trophy color="#FFD700" size={28} /> Ranking
        </h2>
        
        {loading ? <p>Carregando...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #eee", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Pos</th>
                <th style={{ padding: "10px" }}>Usuário</th>
                <th style={{ padding: "10px", textAlign: "center" }}>Válidas</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((user, index) => (
                <tr key={user.username} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>{index + 1}º</td>
                  <td style={{ padding: "12px" }}>{user.username}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <span style={{ background: "var(--primary)", color: "white", padding: "4px 10px", borderRadius: "12px" }}>
                      {user.total_denuncias}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}