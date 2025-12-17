import { useState, useEffect, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { Transaction, TransactionType, Owner } from '../types/financial';

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (transaction: Partial<Transaction>) => void;
  transactionToEdit?: Transaction | null;

  person1Name: string;
  person2Name: string;
}

const categories = {
  income: ['Salário', 'Freelance', 'Investimentos', 'Bônus', 'Outros'],
  expense: ['Aluguel', 'Supermercado', 'Transporte', 'Alimentação', 'Lazer', 'Saúde', 'Educação', 'Contas', 'Outros'],
};

export function TransactionForm({ onClose, onSubmit, transactionToEdit }: TransactionFormProps) {
  const isEditing = Boolean(transactionToEdit);

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

  // Preenche automaticamente no modo de edição
  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setOwner(transactionToEdit.owner);
      setCategory(transactionToEdit.category);
      setAmount(transactionToEdit.amount.toString());
      setDescription(transactionToEdit.description);
      setDate(transactionToEdit.date);
      setIsRecurring(transactionToEdit.isRecurring ?? false);
      setIsInstallment(transactionToEdit.isInstallment ?? false);
      setInstallmentCurrent(transactionToEdit.installmentCurrent?.toString() ?? '1');
      setInstallmentTotal(transactionToEdit.installmentTotal?.toString() ?? '1');
    }
  }, [transactionToEdit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!category || !amount || !description) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const transaction: Partial<Transaction> = {
      id: transactionToEdit?.id,
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
        
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-slate-900 font-semibold">
            {isEditing ? "Editar Transação" : "Nova Transação"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* FORMULÁRIO COMPLETO */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Tipo */}
          <div>
            <label className="block mb-2 text-slate-700">Tipo</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  type === "income"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                Receita
              </button>

              <button
                type="button"
                onClick={() => setType("expense")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  type === "expense"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-200 hover:border-slate-300"
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
              <button type="button" onClick={() => setOwner("person1")} className={`p-4 rounded-xl border-2 transition-all ${
                owner === "person1" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 hover:border-slate-300"
              }`}>
                {person1Name}
              </button>

              <button type="button" onClick={() => setOwner("person2")} className={`p-4 rounded-xl border-2 transition-all ${
                owner === "person2" ? "border-purple-500 bg-purple-50 text-purple-700" : "border-slate-200 hover:border-slate-300"
              }`}>
                {person2Name  }
              </button>

              <button type="button" onClick={() => setOwner("shared")} className={`p-4 rounded-xl border-2 transition-all ${
                owner === "shared" ? "border-pink-500 bg-pink-50 text-pink-700" : "border-slate-200 hover:border-slate-300"
              }`}>
                Compartilhado
              </button>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block mb-2 text-slate-700">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            >
              <option value="">Selecione...</option>
              {categories[type].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Valor */}
          <div>
            <label className="block mb-2 text-slate-700">Valor</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block mb-2 text-slate-700">Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
          </div>

          {/* Data */}
          <div>
            <label className="block mb-2 text-slate-700">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
          </div>

          {/* Recorrência e Parcelado */}
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
              Gasto fixo (recorrente)
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" checked={isInstallment} onChange={(e) => setIsInstallment(e.target.checked)} />
              Parcelado
            </label>
          </div>

          {/* Parcelas */}
          {isInstallment && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              <div>
                <label className="block mb-2">Parcela Atual</label>
                <input
                  type="number"
                  value={installmentCurrent}
                  onChange={(e) => setInstallmentCurrent(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block mb-2">Total de Parcelas</label>
                <input
                  type="number"
                  value={installmentTotal}
                  onChange={(e) => setInstallmentTotal(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>
          )}

          {/* BOTÕES */}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border-2">
              Cancelar
            </button>

            <button type="submit" className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white">
              {isEditing ? "Salvar Alterações" : "Adicionar Transação"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
