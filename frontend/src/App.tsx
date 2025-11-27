import { Navigate } from "react-router-dom";
import Layout from "./component/Layout";
import { useEffect, useState } from "react";
import { GlobalStyle } from "./styles/global";
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
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  const toggleTheme = () => setIsDark((s) => !s);

  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      document.body.classList.toggle("dark", isDark);
    } catch (error) {
    
      console.error(error);
    }
  }, [isDark]);

  return (
    <>
      <GlobalStyle />
      <Router toggleTheme={toggleTheme} isDark={isDark} />
    </>
  );
}
