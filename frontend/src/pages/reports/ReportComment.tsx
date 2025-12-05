import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/client";
import Layout from "../../component/Layout";
import { Container, Text, Label, Title } from "../../styles/ReportDetail.Styles";

type Denuncia = {
    protocolo: string; categoria: string; descricao: string;
    latitude: number; longitude: number; status?: string;
};

type Comentario = {
    id: number; conteudoResposta: string; autor_nome: string; created_at: string;
};

const styles = {
   
    mainWrapper: {
        display: "flex",
        flexDirection: "column" as const,
        height: "calc(100vh - 120px)", 
        gap: "20px"
    },

    detailsSection: {
        flexShrink: 0, 
    },

    chatContainer: { 
        flex: 1, 
        display: "flex",
        flexDirection: "column" as const,
        background: "var(--bg)", 
        borderRadius: 12, 
        border: "1px solid var(--border)",
        overflow: "hidden", 
        position: "relative" as const
    },
    chatHeader: {
        padding: "15px 20px",
        borderBottom: "1px solid var(--border)",
        background: "var(--card)",
        zIndex: 2
    },
    timeline: { 
        flex: 1, 
        overflowY: "auto" as const, 
        padding: "20px",
        display: "flex", 
        flexDirection: "column" as const, 
        gap: 15,
        scrollBehavior: "smooth" as const
    },
    inputArea: {
        padding: "20px",
        borderTop: "1px solid var(--border)",
        background: "var(--card)",
        display: "flex",
        flexDirection: "column" as const,
        gap: 10,
        zIndex: 2
    },
    bubble: { 
        padding: "12px 16px", 
        background: "var(--card)", 
        color: "var(--text)",      
        border: "1px solid rgba(0,0,0,0.1)", 
        borderRadius: "12px", 
        borderTopLeftRadius: "2px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    },
    meta: { 
        fontSize: "0.85em", 
        color: "var(--muted)",     
        marginBottom: 6, 
        fontWeight: 600 
    },
    successBox: { 
        padding: "8px", 
        background: "#d4edda", 
        color: "#155724", 
        borderRadius: "6px", 
        textAlign: "center" as const,
        fontWeight: 500,
        fontSize: "0.85rem",
        marginBottom: "5px"
    }
};

export default function ReportComment() {
    const { protocolo } = useParams<{ protocolo: string }>();
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [conteudoComentario, setConteudo] = useState("");
    const [r, setR] = useState<Denuncia | null>(null);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [comentarios]);

    useEffect(() => {
        async function loadData() {
            try {
                const respDenuncia = await api.get(`api/denuncias/${protocolo}/`);
                setR(respDenuncia.data);

                const respComents = await api.get(`api/denuncias/${protocolo}/comentarios/`);
                setComentarios(respComents.data.sort((a:any, b:any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
            } catch (error) {
                console.error("Erro ao carregar dados", error);
            }
        }
        if(protocolo) loadData();
    }, [protocolo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!conteudoComentario.trim()) return;

        setLoading(true);
        try {
            const res = await api.post(`api/denuncias/${protocolo}/comentarios/`, {
                conteudoResposta: conteudoComentario,
            });
            
            setComentarios((prev) => [...prev, res.data]);
            setConteudo("");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (error) {
            alert("Erro ao enviar comentário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div style={styles.mainWrapper}>

                <div style={styles.detailsSection}>
                    <Container>
                        <Title>{r?.categoria || "Carregando..."}</Title>
                        <Text>{r?.descricao}</Text>
                        <div style={{display: 'flex', gap: 20, marginTop: 10}}>
                            <Text><Label>Protocolo:</Label> {r?.protocolo}</Text>
                            <Text><Label>Status:</Label> {r?.status || "Indefinido"}</Text>
                        </div>
                    </Container>
                </div>
                
                <div style={styles.chatContainer}>

                    <div style={styles.chatHeader}>
                        <h3 style={{fontSize: 18, color: "var(--text)", margin: 0}}>
                            Discussão
                        </h3>
                    </div>

                    <div style={styles.timeline}>
                        {comentarios.length === 0 && (
                            <div style={{textAlign: "center", marginTop: 40, color: "var(--muted)"}}>
                                <p>Nenhuma interação registrada.</p>
                                <small>Seja o primeiro a comentar.</small>
                            </div>
                        )}
                        
                        {comentarios.map((c) => (
                            <div key={c.id} style={styles.bubble}>
                                <div style={styles.meta}>
                                    {c.autor_nome || "Anônimo"} • {new Date(c.created_at).toLocaleString('pt-BR')}
                                </div>
                                <div style={{ lineHeight: 1.5 }}>
                                    {c.conteudoResposta}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={styles.inputArea}>
                        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 10}}>

                            {showSuccess && (
                                <div style={styles.successBox}>
                                    Mensagem enviada com sucesso!
                                </div>
                            )}

                            <textarea
                                value={conteudoComentario}
                                onChange={(e) => setConteudo(e.target.value)}
                                placeholder="Escreva uma mensagem..."
                                rows={2}
                                style={{ 
                                    padding: 12, 
                                    borderRadius: 8, 
                                    border: "1px solid var(--border)", 
                                    fontSize: 15,
                                    background: "var(--bg)",
                                    color: "var(--text)",
                                    resize: "none"
                                }}
                                disabled={loading}
                            />

                            <button 
                                type="submit" 
                                style={{ 
                                    padding: 12, 
                                    backgroundColor: "var(--primary)", 
                                    color: "white", 
                                    border: "none", 
                                    borderRadius: 8, 
                                    fontWeight: "bold", 
                                    cursor: loading ? "not-allowed" : "pointer",
                                    opacity: loading ? 0.7 : 1,
                                    transition: "0.2s"
                                }}
                                disabled={loading}
                            >
                                {loading ? "Enviando..." : "Enviar Mensagem"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}