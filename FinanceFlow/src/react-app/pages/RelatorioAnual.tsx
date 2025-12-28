import { useEffect, useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import { useNavigate } from "react-router";
import Layout from "@/react-app/components/Layout";
import { Loader2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MonthlyData {
  month: number;
  income: number;
  expenses: number;
  balance: number;
}

export default function RelatorioAnual() {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/");
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    if (user) {
      fetchAnnualReport();
    }
  }, [user, selectedYear]);

  const fetchAnnualReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reports/annual?year=${selectedYear}`);
      const reportData = await response.json();
      setData(reportData);
    } catch (error) {
      console.error("Failed to fetch annual report:", error);
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
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const chartData = data.map(item => ({
    name: monthNames[item.month - 1],
    Receitas: item.income,
    Despesas: item.expenses,
    Saldo: item.balance,
  }));

  const negativeMonths = data.filter(item => item.balance < 0);
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Relatório Anual
          </h1>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {[2024, 2025, 2026].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {negativeMonths.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold mb-1">
                  Atenção: Saldo negativo em {negativeMonths.length} {negativeMonths.length === 1 ? 'mês' : 'meses'}
                </p>
                <p className="text-red-700 text-sm">
                  {negativeMonths.map(m => monthNames[m.month - 1]).join(', ')}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-emerald-100">
            <h3 className="text-gray-600 font-medium mb-2">Total de Receitas</h3>
            <p className="text-3xl font-bold text-emerald-600">
              R$ {totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-red-100">
            <h3 className="text-gray-600 font-medium mb-2">Total de Despesas</h3>
            <p className="text-3xl font-bold text-red-600">
              R$ {totalExpenses.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100">
            <h3 className="text-gray-600 font-medium mb-2">Saldo Anual</h3>
            <p className={`text-3xl font-bold ${totalBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              R$ {totalBalance.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Evolução Mensal - {selectedYear}
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => `R$ ${value.toFixed(2)}`}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="Receitas" 
                fill="#10b981" 
                radius={[8, 8, 0, 0]}
              />
              <Bar 
                dataKey="Despesas" 
                fill="#ef4444" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Resumo Mês a Mês
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mês</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Receitas</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Despesas</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Saldo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((item) => (
                  <tr key={item.month} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {monthNames[item.month - 1]}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-emerald-600 font-semibold">
                      R$ {item.income.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-red-600 font-semibold">
                      R$ {item.expenses.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 text-sm text-right font-bold ${
                      item.balance >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      R$ {item.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
