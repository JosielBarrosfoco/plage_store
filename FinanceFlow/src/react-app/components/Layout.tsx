import { ReactNode, useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import { Link, useNavigate, useLocation } from "react-router";
import { LogOut, LayoutDashboard, Receipt, BarChart3, Database } from "lucide-react";
import ImportExportModal from "@/react-app/components/ImportExportModal";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showImportExport, setShowImportExport] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <ImportExportModal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
      />
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                FinanceFlow
              </h1>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/dashboard")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>

              <Link
                to="/transacoes"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/transacoes")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span className="hidden md:inline">Transações</span>
              </Link>

              <Link
                to="/relatorio-anual"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/relatorio-anual")
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Relatório Anual</span>
              </Link>

              <button
                onClick={() => setShowImportExport(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Database className="w-4 h-4" />
                <span className="hidden md:inline">Dados</span>
              </button>

              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                {user?.google_user_data?.picture && (
                  <img
                    src={user.google_user_data.picture}
                    alt={user.google_user_data.name || "User"}
                    className="w-8 h-8 rounded-full border-2 border-emerald-200"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
