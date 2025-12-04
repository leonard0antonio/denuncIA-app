import { useState } from "react";
import api from "../api/client";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { ACESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/LoginRegisterForm.css"

interface FormProps {
    route: string;
    method: "login" | "register" | "registerGestorP";
}

function LoginRegisterForm({ route, method } : FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert("Erro: " + error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Carregando..." : name}
            </button>

            {method === "login" && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <Link to="/gestor/register" style={{ color: "#007bff", textDecoration: "none" }}>
                        É um gestor público? Clique aqui
                    </Link>
                    <br />
                    <Link to="/register" style={{ color: "#007bff", textDecoration: "none", fontSize: "0.9em" }}>
                        Não tem conta? Cadastre-se
                    </Link>
                </div>
            )}
        </form>
    );
}

export default LoginRegisterForm