// src/component/CommentSection.tsx (Agora como página de Detalhes e Comentários)

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
import Layout from "../../component/Layout";
import {
    Container,
     Text,
    Label,
    Title,
} from "../../styles/ReportDetail.Styles";
type Denuncia = {
    protocolo: string;
    categoria: string;
    descricao: string;
    latitude: number;
     longitude: number;
    status?: string; 
};

type Comentario = {
    id: number;
    conteudoResposta: string;
    autor_nome: string;
    created_at: string;
};

const CommentContainer = {
    marginTop: "20px",
    padding: "15px",
    borderTop: "1px solid #ccc",
};

const CommentItem = {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
};

const AuthorText = {
    fontSize: "0.8em",
    color: "#555",
    marginBottom: "5px",
};

const CommentForm = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    marginBottom: "20px"
};

export default function DenunciaDetalheComentarios() {
    const { protocolo } = useParams<{ protocolo: string }>();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [conteudoComentario, setConteudo] = useState("")
    const [r, setR] = useState<Denuncia | null>(null);
    const [loadingComentarios, setLoadingComentarios] = useState(false);


  useEffect(() => {
    async function load() { 
      let found;
      let itemFromLocalStorage = null;

      const arr = JSON.parse(localStorage.getItem("denuncias") || "[]") as Denuncia[];
      itemFromLocalStorage = arr.find((x) => x.protocolo === protocolo) || null;
      found = itemFromLocalStorage;
      
        if (found == null){
          try{
        const response = await api.get(`api/denuncias/${protocolo}/`);
        found = response.data as Denuncia;
          } catch (error) {
                    console.error("Erro ao carregar denúncia:", error);
          }
      };

     setR(found)

    }

    load();
  }, [protocolo]);                                    

        const loadComentarios = () => {
        if (!protocolo) return;
        setLoadingComentarios(true);
        api.get(`api/denuncias/${protocolo}/comentarios/`)
            .then((res) => {
                setComentarios(res.data.sort((a: Comentario, b: Comentario) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
            })
            .catch((err) => console.error("Erro ao carregar comentários:", err))
            .finally(() => setLoadingComentarios(false));
    };

    useEffect(() => {
        loadComentarios();
    }, [protocolo]);

       
    const rpt = {
      conteudoResposta: conteudoComentario,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       

        setLoadingComentarios(true);
        
        api.post(`api/denuncias/${protocolo}/comentarios/`, rpt)
        .then((res) => {
                setComentarios((prev) => [...prev, res.data]);

        setConteudo("");
    }).finally(() => {
                setLoadingComentarios(false);
     });
}


    


    return (
        <Layout>
            <Title>Detalhes da Denúncia</Title>
  <Layout>
      <Container>
        <Title>{r?.categoria}</Title>

        <Text>{r?.descricao}</Text>

        <Text>
          <Label>Protocolo:</Label> {r?.protocolo}
        </Text>

        <Text>
          <Label>Local:</Label> {r?.latitude}, {r?.longitude}
        </Text>

     
      </Container>
    </Layout>
            
            <div style={CommentContainer}>
                <h3>Sessão de Comentários</h3>

                <form onSubmit={handleSubmit} style={CommentForm}>
                    <textarea
                        value={conteudoComentario}
                        onChange={(e) => setConteudo(e.target.value)}
                        placeholder="Digite seu comentário ou atualização..."
                        rows={3}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                        disabled={loadingComentarios}
                    />
                    <button 
                        type="submit" 
                        style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        disabled={loadingComentarios}
                    >
                        {loadingComentarios ? "Enviando..." : "Comentar"}
                    </button>
                </form>

                {loadingComentarios && comentarios.length === 0 && <p>Carregando comentários...</p>}
                {comentarios.length === 0 && !loadingComentarios && <p>Ainda não há comentários.</p>}
                
                {comentarios.map((c) => (
                    <div key={c.id} style={CommentItem}>
                        <p style={AuthorText}>
                            **{c.autor_nome || "Usuário Deletado"}** em {new Date(c.created_at).toLocaleString()}
                        </p>
                        <p>{c.conteudoResposta}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
    }