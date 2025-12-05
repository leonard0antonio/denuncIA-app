import { useState } from "react";
import api from "../api/client";
import { useNavigate, Link } from "react-router-dom";
import { ACESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/LoginRegisterForm.css"

interface FormProps {
    route: string;
    method: "login" | "register" | "loginGestorPublico" |"registerGestorPublico";
}

function LoginRegisterForm({ route, method } : FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cra_de_gestor, setCra_Gestor] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method.includes("login") ? "Entrar" : "Cadastrar";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();                                                     

        let dataToSend;
        if (method === "login" || method === "register") {
            dataToSend = { username, password };
        } else if (method === "registerGestorPublico") {
            dataToSend = { username, password, cra_de_gestor }; 
        } else if (method === "loginGestorPublico"){
            dataToSend = { username, cra_de_gestor, password };
        }

        try {
            const res = await api.post(route, dataToSend);
            
            if (method.includes("login")) {
                localStorage.setItem(ACESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                if (method === "loginGestorPublico") {
                    localStorage.setItem("userType", "gestor");
                } else {
                    localStorage.setItem("userType", "citizen");
                }

                navigate("/home");
            } else {
                alert("Cadastro realizado com sucesso! Faça login.");
                if (method === "registerGestorPublico") {
                    navigate("/login/gestor");
                } else {
                    navigate("/login/citizen");
                }
            }
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.detail 
                || JSON.stringify(error.response?.data) 
                || "Erro na operação. Verifique os dados.";
            alert(errorMsg);
        } finally {
            setLoading(false)
        }
    };

    if(method === "registerGestorPublico" || method === "loginGestorPublico"){
        const isRegister = method === "registerGestorPublico";
        return(
           <form onSubmit={handleSubmit} className="form-container">
             <h1>{isRegister ? "Cadastro de Gestor" : "Login de Gestor"}</h1>
             
             <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
             <input className="form-input" type="text" value={cra_de_gestor} onChange={(e) => setCra_Gestor(e.target.value)} placeholder="CRA (Registro)" />
             <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
             
             <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Processando..." : name}
             </button> 
             
             <div style={{marginTop: 15, textAlign: 'center'}}>
                 <Link to={isRegister ? "/login/gestor" : "/gestor/register"} style={{color: '#007bff', display: 'block', marginBottom: 5}}>
                    {isRegister ? "Já possui conta? Fazer Login" : "Não possui conta? Cadastrar Gestor"}
                 </Link>
                 <Link to="/auth" style={{color: '#6c757d', fontSize: '0.9em'}}>Voltar para Seleção</Link>
             </div>
           </form>
        );
    }

    const isRegister = method === "register";
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{isRegister ? "Cadastro Cidadão" : "Login Cidadão"}</h1>
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
            
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Processando..." : name}
            </button>

            <div style={{marginTop: 15, textAlign: 'center'}}>
                <Link to={isRegister ? "/login/citizen" : "/register/citizen"} style={{color: '#007bff', display: 'block', marginBottom: 5}}>
                    {isRegister ? "Já possui conta? Fazer Login" : "Não possui conta? Cadastrar-se"}
                </Link>
                <Link to="/auth" style={{color: '#6c757d', fontSize: '0.9em'}}>Voltar para Seleção</Link>
            </div>
        </form>
    );
}

export default LoginRegisterForm