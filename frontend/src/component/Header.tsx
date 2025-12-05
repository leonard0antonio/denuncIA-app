import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Bar, Nav, LeftGroup, NavLink, ThemeButton } from "../styles/Header.styles";

export default function Header({ toggleTheme, isDark }: { toggleTheme: () => void; isDark: boolean; }) {
  const location = useLocation();
  const authRoutes = ["/auth", "/login", "/register", "/gestor"];
  const isAuthPage = authRoutes.some(route => location.pathname.startsWith(route));
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Bar
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }} 
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <LeftGroup>
        <NavLink to={isAuthPage ? "/auth" : "/home"} style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.5px" }}>
          DenuncIA
        </NavLink>
        
        {!isAuthPage && (
          <>
            <NavLink to="/denuncias">Minhas Denúncias</NavLink>
            <NavLink to="/denuncias/proximas">Próximas</NavLink>
            <NavLink to="/ranking">Ranking</NavLink>
          </>
        )}
      </LeftGroup>

      <Nav>
        {!isAuthPage && (
          <>
            <NavLink to="/reports/new" style={{background: "var(--primary)", color: "white", padding: "8px 16px", borderRadius: "8px"}}>
              Nova
            </NavLink>
            <NavLink to="/logout" style={{color: "var(--danger)"}}>Sair</NavLink>
          </>
        )}
        <ThemeButton onClick={toggleTheme}>{isDark ? "🌙" : "☀️"}</ThemeButton>
      </Nav>
    </Bar>
  );
}