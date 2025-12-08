import { Transaction, FinancialSummary } from '../types/financial';
import { TrendingUp, TrendingDown, Wallet, Users, User } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
  person1Name: string; // novo
  person2Name: string; // novo
}


export function Dashboard({ transactions, person1Name, person2Name }: DashboardProps) {

  const summary: FinancialSummary = transactions.reduce(
    (acc, transaction) => {
      const amount = transaction.amount;

      if (transaction.type === 'income') {
        acc.totalIncome += amount;
        if (transaction.owner === 'person1') acc.person1Income += amount;
        else if (transaction.owner === 'person2') acc.person2Income += amount;
        else acc.sharedIncome += amount;
      } else {
        acc.totalExpenses += amount;
        if (transaction.owner === 'person1') acc.person1Expenses += amount;
        else if (transaction.owner === 'person2') acc.person2Expenses += amount;
        else acc.sharedExpenses += amount;
      }

      return acc;
    },
    {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      person1Income: 0,
      person2Income: 0,
      sharedIncome: 0,
      person1Expenses: 0,
      person2Expenses: 0,
      sharedExpenses: 0,
    }
  );

  summary.balance = summary.totalIncome - summary.totalExpenses;

  const chartData = [
    {
      name: person1Name,
      Receitas: summary.person1Income,
      Despesas: summary.person1Expenses,
    },
    {
      name: person2Name,
      Receitas: summary.person2Income,
      Despesas: summary.person2Expenses,
    },
    {
      name: 'Compartilhado',
      Receitas: summary.sharedIncome,
      Despesas: summary.sharedExpenses,
    },
  ];



  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-1">Receitas Totais</p>
          <p className="text-green-600 text-2xl">
            R$ {summary.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-red-100 p-3 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-1">Despesas Totais</p>
          <p className="text-red-600 text-2xl">
            R$ {summary.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className={`${summary.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'} p-3 rounded-xl`}>
              <Wallet className={`w-6 h-6 ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-1">Saldo</p>
          <p className={`text-2xl ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            R$ {summary.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-slate-600 text-sm mb-1">Despesas Compartilhadas</p>
          <p className="text-purple-600 text-2xl">
            R$ {summary.sharedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-slate-900 mb-4">Receitas vs Despesas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="Receitas" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Despesas" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-slate-900 mb-4">Despesas por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cards Individuais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <User className="w-6 h-6" />
            </div>
            <h3>{person1Name}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-100">Receitas</span>
              <span>R$ {summary.person1Income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-100">Despesas</span>
              <span>R$ {summary.person1Expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-white/20 pt-3 flex justify-between items-center">
              <span>Saldo Individual</span>
              <span>R$ {(summary.person1Income - summary.person1Expenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <User className="w-6 h-6" />
            </div>
            <h3>{person2Name}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-purple-100">Receitas</span>
              <span>R$ {summary.person2Income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-100">Despesas</span>
              <span>R$ {summary.person2Expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-white/20 pt-3 flex justify-between items-center">
              <span>Saldo Individual</span>
              <span>R$ {(summary.person2Income - summary.person2Expenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
