import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Interface correta esperando 'data'
interface CostBreakdownChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({ data }) => {
  // Se quiser manter o log para conferência
  console.log('CostBreakdownChart data:', data);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light flex flex-col items-center justify-center h-[320px]">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Custos por Categoria</h3>
        <p className="text-gray-400 text-sm">Sem dados para exibir</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light flex flex-col h-[380px]">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Para onde vai o dinheiro?</h3>
      <div className="flex-1 w-full h-full">
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
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};