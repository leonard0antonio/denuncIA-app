import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import api from "../api/client"
import { REFRESH_TOKEN, ACESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode
}



function ProtectedRoute({children} : ProtectedRouteProps) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);



        useEffect(() => {

                const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("/denuncia/token/refresh/", { // acessa a rota de refresh utilizando o refresh token como payload
                refresh: refreshToken
            });
            if(res.status === 200) {
                localStorage.setItem(ACESS_TOKEN, res.data.acess)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }


                const checkAuthStatus  = async () =>{
        const token = localStorage.getItem(ACESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration: number = decoded.exp as number;
        const now = Date.now() / 1000

        if (tokenExpiration < now) { //caso o token já tenha expirado
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

            const checkAuth = async () => {
                try{
                    await checkAuthStatus();

                }catch(e){
                console.error("Erro durante a checagem de autenticação:", e);
                 setIsAuthorized(false); //caso tenha algum erro no auth()
                }
            };

            checkAuth()

        }, []);

            

    if (isAuthorized == null) {
        return <div>Carregando...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute