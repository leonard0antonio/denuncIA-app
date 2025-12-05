import {
  Bar,
  Nav,
  LeftGroup,
  NavLink,
  ThemeButton,
} from "../styles/Header.styles";

export default function Header({
  toggleTheme,
  isDark,
}: {
  toggleTheme: () => void;
  isDark: boolean;
}) {
  return (
    <Bar>
      <LeftGroup>
        <NavLink to="/home" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
          DenuncIA
        </NavLink>
        <NavLink to="/denuncias">Minhas Denúncias</NavLink>
        <NavLink to="/denuncias/proximas"> Denúncias Próximas </NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
      </LeftGroup>

      <Nav>
        <NavLink to="/reports/new" style={{background: "var(--primary)", color: "white", padding: "6px 12px", borderRadius: "6px"}}>
          Nova Denúncia
        </NavLink>
        
        <NavLink to="/logout" style={{color: "var(--danger)"}}>Sair</NavLink>

        <ThemeButton onClick={toggleTheme}>
          {isDark ? "🌙" : "☀️"}
        </ThemeButton>
      </Nav>
    </Bar>
  );
}