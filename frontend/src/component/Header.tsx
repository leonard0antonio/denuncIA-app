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
        <NavLink to="/" style={{ fontWeight: 700 }}>
          DenuncIA
        </NavLink>
        <NavLink to="/denuncias/">Denúncias</NavLink>
      </LeftGroup>

      <Nav>
        <NavLink to="/reports/new">Nova</NavLink>

        <ThemeButton onClick={toggleTheme}>
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </ThemeButton>
      </Nav>
    </Bar>
  );
}
