import { useEffect, useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import { useNavigate } from "react-router";
import Layout from "@/react-app/components/Layout";
import IncomeModal from "@/react-app/components/IncomeModal";
import ExpenseModal from "@/react-app/components/ExpenseModal";
import { Loader2, TrendingUp, TrendingDown, Wallet, Plus } from "lucide-react";
import { DashboardSummary } from "@/shared/types";

export default function Dashboard() {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/");
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    if (user) {
      fetchSummary();
    }
  }, [user, currentMonth, currentYear]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard/summary?month=${currentMonth}&year=${currentYear}`
      );
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch summary:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending || loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
      </Layout>
    );
  }

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const totalExpenses = summary?.totalExpenses || 0;
  const totalIncome = summary?.totalIncome || 0;
  const balance = summary?.balance || 0;
  const expensePercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  return (
    <Layout>
      <IncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onSuccess={fetchSummary}
      />
      <ExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        onSuccess={fetchSummary}
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              {monthNames[currentMonth - 1]} {currentYear}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowIncomeModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Nova Receita</span>
            </button>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Nova Despesa</span>
            </button>
          </div>
        </div>

        {expensePercentage > 90 && (
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
            <p className="text-amber-800 font-medium">
              ⚠️ Atenção: Suas despesas já representam {expensePercentage.toFixed(0)}% da sua receita mensal!
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Receitas</h3>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-emerald-600">
              R$ {totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-red-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Despesas</h3>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600">
              R$ {totalExpenses.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Saldo do Mês</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              R$ {balance.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Despesas por Categoria
          </h3>
          {summary?.expensesByCategory && summary.expensesByCategory.length > 0 ? (
            <div className="space-y-3">
              {summary.expensesByCategory.map((category, index) => {
                const percentage = totalExpenses > 0 ? (category.total / totalExpenses) * 100 : 0;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-700 font-medium">{category.name}</span>
                        <span className="text-gray-600">R$ {category.total.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Nenhuma despesa registrada neste mês
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
