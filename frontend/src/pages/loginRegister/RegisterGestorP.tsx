import { useState } from "react";
import api from "../../api/client";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginRegisterForm.css";

export default function RegisterGestorP() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cra, setCra] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !cra) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    const payload = {
      username,
      password,
      gestorPublico: {
        cra_de_gestor: cra,
      },
    };

    try {
      await api.post("/api/gestor/register/", payload);
      alert("Gestor cadastrado com sucesso! Faça login.");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      alert("Erro ao cadastrar gestor. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Cadastro Gestor</h1>
      <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          className="form-input"
          type="text"
          value={cra}
          onChange={(e) => setCra(e.target.value)}
          placeholder="CRA (Registro de Gestor)"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Gestor"}
        </button>
      </form>
      
      <button 
        onClick={() => navigate("/login")}
        style={{ background: "transparent", border: "none", color: "#007bff", cursor: "pointer", marginTop: "10px" }}
      >
        Voltar para Login
      </button>
    </div>
  );
}