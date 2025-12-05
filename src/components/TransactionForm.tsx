import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { Transaction, TransactionType, Owner } from '../types/financial';

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = {
  income: ['Salário', 'Freelance', 'Investimentos', 'Bônus', 'Outros'],
  expense: ['Aluguel', 'Supermercado', 'Transporte', 'Alimentação', 'Lazer', 'Saúde', 'Educação', 'Contas', 'Outros'],
};

export function TransactionForm({ onClose, onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [owner, setOwner] = useState<Owner>('shared');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [isInstallment, setIsInstallment] = useState(false);
  const [installmentCurrent, setInstallmentCurrent] = useState('1');
  const [installmentTotal, setInstallmentTotal] = useState('1');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount || !description) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const transaction: Omit<Transaction, 'id'> = {
      type,
      owner,
      category,
      amount: parseFloat(amount),
      description,
      date,
      isRecurring,
      isInstallment,
      ...(isInstallment && {
        installmentCurrent: parseInt(installmentCurrent),
        installmentTotal: parseInt(installmentTotal),
      }),
    };

    onSubmit(transaction);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-slate-900">Nova Transação</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Transação */}
          <div>
            <label className="block text-slate-700 mb-2">Tipo</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  type === 'income'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                Receita
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  type === 'expense'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                Despesa
              </button>
            </div>
          </div>

          {/* Proprietário */}
          <div>
            <label className="block text-slate-700 mb-2">Proprietário</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setOwner('person1')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  owner === 'person1'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                Rafael
              </button>
              <button
                type="button"
                onClick={() => setOwner('person2')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  owner === 'person2'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                Lavínia
              </button>
              <button
                type="button"
                onClick={() => setOwner('shared')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  owner === 'shared'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                Compartilhado
              </button>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-slate-700 mb-2">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories[type].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Valor */}
          <div>
            <label className="block text-slate-700 mb-2">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0,00"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-slate-700 mb-2">Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição da transação"
              required
            />
          </div>

          {/* Data */}
          <div>
            <label className="block text-slate-700 mb-2">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Opções Adicionais */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700">Gasto fixo (recorrente)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isInstallment}
                onChange={(e) => setIsInstallment(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700">Parcelado</span>
            </label>
          </div>

          {/* Parcelas */}
          {isInstallment && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              <div>
                <label className="block text-slate-700 mb-2 text-sm">Parcela Atual</label>
                <input
                  type="number"
                  min="1"
                  value={installmentCurrent}
                  onChange={(e) => setInstallmentCurrent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2 text-sm">Total de Parcelas</label>
                <input
                  type="number"
                  min="1"
                  value={installmentTotal}
                  onChange={(e) => setInstallmentTotal(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              Adicionar Transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
