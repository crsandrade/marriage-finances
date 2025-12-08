"use client";

import { cn } from "@/lib/utils";

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

interface MonthBarProps {
  selectedMonth: number;
  setSelectedMonth: (m: number) => void;
}

export function MonthBar({ selectedMonth, setSelectedMonth }: MonthBarProps) {
  return (
    <div className="flex justify-between overflow-x-auto pb-2 scrollbar-hide font-bold">
      {MONTHS.map((m, index) => {
        const monthNumber = index + 1;
        const isActive = monthNumber === selectedMonth;

        return (
          <button
            key={m}
            onClick={() => setSelectedMonth(monthNumber)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl border transition shadow-sm",
              "hover:bg-slate-100",
              isActive
                ? "bg-blue-600 text-white border-blue-700 shadow-md"
                : "bg-white text-slate-700 border-slate-300"
            )}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}
