import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ReportList from "../pages/reports/ReportList";
import ReportCreate from "../pages/reports/ReportCreate";
import ReportDetail from "../pages/reports/ReportDetail";
import ReportEdit from "../pages/reports/ReportEdit";
import ReportDelete from "../pages/reports/ReportDelete";
import ReportComment from "../pages/reports/ReportComment";
import Ranking from "../pages/Ranking";
import NearbyReports from "../pages/reports/NearbyReports";
import Header from "../component/Header";
import ProtectedRoute from "../component/ProtectedRoute";
import Login from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import AuthSelection from "../pages/loginRegister/AuthSelection";

import RegisterGestorP from "../pages/loginRegister/RegisterGestorP";
import LoginGestorPublico from "../pages/loginRegister/LoginGestorP"; 

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

function Logout() {
  localStorage.clear();
  return <Navigate to="/auth" />;
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
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/auth" element={<AuthSelection />} />  
        <Route path="/login/citizen" element={<Login />} />
        <Route path="/register/citizen" element={<RegisterAndLogout />} />
        <Route path="/login/gestor" element={<LoginGestorPublico />} />
        <Route path="/gestor/register" element={<RegisterGestorP />} />      
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/denuncias" element={<ReportList />} />
        <Route path="/denuncias/proximas" element={<NearbyReports />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/reports/new" element={<ReportCreate />} />
        <Route path="/denuncias/:protocolo" element={<ReportDetail />} />
        <Route path="/denuncias/:protocolo/edit" element={<ReportEdit />} />
        <Route path="/denuncias/:protocolo/delete" element={<ReportDelete />} />
        <Route path="/denuncias/:protocolo/comment" element={<ReportComment/>}/>
      </Routes>
    </>
  );
}