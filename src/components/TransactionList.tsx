import { useState } from 'react';
import { Transaction } from '../types/financial';
import { Trash2, TrendingUp, TrendingDown, Calendar, Repeat, CreditCard, Filter } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

type FilterType = 'all' | 'income' | 'expense';
type FilterOwner = 'all' | 'person1' | 'person2' | 'shared';

export function TransactionList({ transactions, onDelete }: TransactionListProps) {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterOwner, setFilterOwner] = useState<FilterOwner>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesOwner = filterOwner === 'all' || t.owner === filterOwner;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesOwner && matchesSearch;
  });

  const getOwnerLabel = (owner: string) => {
    switch (owner) {
      case 'person1': return 'Pessoa 1';
      case 'person2': return 'Pessoa 2';
      case 'shared': return 'Compartilhado';
      default: return owner;
    }
  };

  const getOwnerColor = (owner: string) => {
    switch (owner) {
      case 'person1': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'person2': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'shared': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <h2 className="text-slate-900">Transações</h2>
        </div>

        {/* Busca */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar transações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 mb-2 text-sm">Tipo</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  filterType === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterType('income')}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  filterType === 'income'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => setFilterType('expense')}
                className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                  filterType === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Despesas
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-2 text-sm">Proprietário</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterOwner('all')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all text-sm ${
                  filterOwner === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterOwner('person1')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all text-sm ${
                  filterOwner === 'person1'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                P1
              </button>
              <button
                onClick={() => setFilterOwner('person2')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all text-sm ${
                  filterOwner === 'person2'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                P2
              </button>
              <button
                onClick={() => setFilterOwner('shared')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all text-sm ${
                  filterOwner === 'shared'
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Comp.
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>Nenhuma transação encontrada</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'income'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className={`w-4 h-4 ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-slate-900 truncate">{transaction.description}</p>
                        {transaction.isRecurring && (
                          <Repeat className="w-4 h-4 text-blue-600 flex-shrink-0" aria-label="Recorrente" />
                        )}
                        {transaction.isInstallment && (
                          <CreditCard className="w-4 h-4 text-orange-600 flex-shrink-0" aria-label="Parcelado" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-lg border text-xs ${getOwnerColor(transaction.owner)}`}>
                          {getOwnerLabel(transaction.owner)}
                        </span>
                        <span className="text-slate-500 text-sm">{transaction.category}</span>
                        {transaction.isInstallment && (
                          <span className="text-orange-600 text-sm">
                            {transaction.installmentCurrent}/{transaction.installmentTotal}x
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p className={`${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-1 text-slate-500 text-sm justify-end mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(transaction.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded-lg transition-all"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
