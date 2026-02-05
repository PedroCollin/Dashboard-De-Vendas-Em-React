import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Expense } from '../utils/dataProcessor';

interface CostBreakdownChartProps {
  expenses: Expense[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({ expenses }) => {
  // Agrupa despesas por categoria
  const dataMap = expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.value;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Para onde vai o dinheiro? (Custos)</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => typeof value === 'number' ? `R$ ${value.toFixed(2)}` : ''} />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-400 text-center mt-2">Distribuição dos gastos totais</p>
    </div>
  );
};