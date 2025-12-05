import LoginRegisterForm from "../../component/LoginRegisterForms"

export default function RegisterGestorP() {
    return(
        <LoginRegisterForm 
            route="api/gestor/register/" 
            method="registerGestorPublico" 
        />
    )
}