import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ReportList from "../pages/reports/ReportList";
import ReportCreate from "../pages/reports/ReportCreate";
import ReportDetail from "../pages/reports/ReportDetail";
import Header from "../component/Header";

type Props = {
  toggleTheme: () => void;
  isDark: boolean;
};

export default function Router({ toggleTheme, isDark }: Props) {
  return (
    <>
      <Header toggleTheme={toggleTheme} isDark={isDark} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<ReportList />} />
        <Route path="/reports/new" element={<ReportCreate />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
      </Routes>
    </>
  );
}
