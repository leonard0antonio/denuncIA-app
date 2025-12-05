import { useState } from "react";
import api from "../api/client";
import { useNavigate, Link } from "react-router-dom"; // Importe Link aqui
import { ACESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/LoginRegisterForm.css"

interface FormProps {
    route: string;
    method: "login" | "register" | "loginGestorPublico" |"registerGestorPublico";
}

function LoginRegisterForm({ route, method } : FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cra_de_gestor, setCra_Gestor] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();                                                     

        let dataToSend;
        if (method === "login" || method === "register") {
            dataToSend = { username, password };
        } else if (method === "registerGestorPublico") {
            dataToSend = { username, password, cra_de_gestor }; // Envia cra_de_gestor no nível raiz conforme a API espera
        } else if (method === "loginGestorPublico"){
            dataToSend = { cra_de_gestor: cra_de_gestor, password: password };
        }

        try {
            const res = await api.post(route, dataToSend);
            if (method.includes("login")) {
                localStorage.setItem(ACESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home")
            } else {
                alert("Cadastro realizado! Faça login.");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            alert("Erro na operação. Verifique os dados.");
        } finally {
            setLoading(false)
        }
    };

    if(method === "registerGestorPublico"){
        return(
           <form onSubmit={handleSubmit} className="form-container">
             <h1>Cadastro Gestor Público</h1>
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className="form-input" type="text" value={cra_de_gestor} onChange={(e) => setCra_Gestor(e.target.value)} placeholder="CRA de gestor" />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="form-button" type="submit" disabled={loading}>{loading ? "Carregando..." : "Cadastrar"}</button> 
            <Link to="/login/gestor" style={{marginTop: 10, color: '#007bff'}}>Já possui uma conta? Clique aqui</Link>
           </form>
        );
    }

    if(method === "loginGestorPublico"){
        return(
           <form onSubmit={handleSubmit} className="form-container">
             <h1>Login Gestor Público</h1>
            <input className="form-input" type="text" value={cra_de_gestor} onChange={(e) => setCra_Gestor(e.target.value)} placeholder="CRA de gestor" />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="form-button" type="submit" disabled={loading}>{loading ? "Entrando..." : "Logar"}</button> 
            <Link to="/login" style={{marginTop: 10, color: '#007bff'}}>Não é um gestor público? Clique aqui</Link>
            <br />
            <Link to="/gestor/register" style={{marginTop: 5, color: '#007bff'}}>Não possui cadastro? Clique aqui</Link>
           </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="form-button" type="submit" disabled={loading}>{loading ? "Carregando..." : name}</button>

            {method === "login" && (
                <>
                    <Link to="/login/gestor" style={{marginTop: 10, color: '#007bff'}}>É um gestor público? Clique aqui</Link>
                    <br />
                    <Link to="/register" style={{marginTop: 5, color: '#007bff'}}>Não possui cadastro? Clique aqui</Link>
                </>
            )}
        </form>
    );
}

export default LoginRegisterForm