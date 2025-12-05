import { useEffect, useState } from "react";
import { GlobalStyle } from "./styles/global";
import Router from "./routes/Router";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") return false;  
      return true; 
    } catch {
      return true;
    }
  });

  const toggleTheme = () => setIsDark((s) => !s);

  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      if (isDark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
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