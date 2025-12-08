"use client";

interface YearSelectProps {
  selectedYear: number;
  setSelectedYear: (y: number) => void;
}

export function YearSelect({ selectedYear, setSelectedYear }: YearSelectProps) {
  const years = [2024, 2025, 2026];

  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-700 font-medium">Ano:</span>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="px-3 py-2 border rounded-lg bg-white shadow-sm"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
