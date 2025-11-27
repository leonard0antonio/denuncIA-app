import { Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import Router from "./routes/Router";
import Register from "./pages/loginRegister/Register"
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register/>
}

export default function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}
