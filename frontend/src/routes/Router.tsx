import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ReportList from "../pages/reports/ReportList";
import ReportCreate from "../pages/reports/ReportCreate";
import ReportDetail from "../pages/reports/ReportDetail";
import ProtectedRoute from "../component/ProtectedRoute";
import Login from "../pages/loginRegister/Login"
import Register from "../pages/loginRegister/Register"

export default function Router() {
  return (
    <Routes>
   
      <Route path="/home" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute> }/>
      
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/reports" element={<ReportList />} />
      <Route path="/reports/new" element={<ReportCreate />} />
      <Route path="/reports/:id" element={<ReportDetail />} />
    </Routes>
  );
}
