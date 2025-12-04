import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ReportList from "../pages/reports/ReportList";
import ReportCreate from "../pages/reports/ReportCreate";
import ReportDetail from "../pages/reports/ReportDetail";
import ReportEdit from "../pages/reports/ReportEdit";
import ReportDelete from "../pages/reports/ReportDelete";
import ReportComment from "../pages/reports/ReportComment";
import Header from "../component/Header";
import ProtectedRoute from "../component/ProtectedRoute";
import Login from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import RegisterGestorP from "../pages/loginRegister/RegisterGestorP";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register />;
}

export default function Router({ toggleTheme, isDark }: Props) {
  return (
    <>
      <Header toggleTheme={toggleTheme} isDark={isDark} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        
        <Route path="/gestor/register" element={<RegisterGestorP />} />
        
        <Route path="/logout" element={<Logout />} />

        <Route path="/denuncias" element={<ReportList />} />
        <Route path="/reports/new" element={<ReportCreate />} />
        <Route path="/denuncias/:protocolo" element={<ReportDetail />} />

        <Route path="/denuncias/:protocolo/edit" element={<ReportEdit />} />
        <Route path="/denuncias/:protocolo/delete" element={<ReportDelete />} />

        <Route path="/denuncias/:protocolo/comment" element={<ReportComment/>}/>

      </Routes>
    </>
  );
}