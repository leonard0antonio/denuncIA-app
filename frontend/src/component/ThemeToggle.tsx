import { ToggleButton } from "../styles/themeToggle.styles";

interface ThemeToggleProps {
  onToggle: () => void;
  isDark: boolean;
}

export default function ThemeToggle({ onToggle, isDark }: ThemeToggleProps) {
  return (
    <ToggleButton
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </ToggleButton>
  );
}
