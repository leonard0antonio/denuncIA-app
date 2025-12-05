import LoginRegisterForm from "../../component/LoginRegisterForms";

export default function LoginGestorP() {
    return (
        <LoginRegisterForm 
            route="denuncia/token/gestor/" 
            method="loginGestorPublico" 
        />
    );
}