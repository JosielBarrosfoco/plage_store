import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import HomePage from "@/react-app/pages/Home";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import DashboardPage from "@/react-app/pages/Dashboard";
import TransacoesPage from "@/react-app/pages/Transacoes";
import RelatorioAnualPage from "@/react-app/pages/RelatorioAnual";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transacoes" element={<TransacoesPage />} />
          <Route path="/relatorio-anual" element={<RelatorioAnualPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
