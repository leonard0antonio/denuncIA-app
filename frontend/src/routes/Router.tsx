import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ReportList from "../pages/reports/ReportList";
import ReportCreate from "../pages/reports/ReportCreate";
import ReportDetail from "../pages/reports/ReportDetail";
import Header from "../component/Header";
import ProtectedRoute from "../component/ProtectedRoute";
import Login from "../pages/loginRegister/Login"
import Register from "../pages/loginRegister/Register"
import { Navigate } from "react-router-dom";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />
}

function RegisterAndLogout(){
  localStorage.clear();
  return <Register/>
}

export default function Router({ toggleTheme, isDark }: Props) {
  return (
    <>
      <Header toggleTheme={toggleTheme} isDark={isDark} />
      <Routes>
         <Route path="/home" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute> }/>
      
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterAndLogout/>} />
      <Route path="/logout" element={<Logout/>} />
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<ReportList />} />
        <Route path="/reports/new" element={<ReportCreate />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
      </Routes>
    </>
  );
}
