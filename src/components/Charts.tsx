import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, PieChart, Pie, Tooltip, LineChart, Line, Cell } from 'recharts';
import type { InvestorHistory } from '../utils/dataProcessor';

const COLORS = ['#5D4037', '#8D6E63', '#A1887F', '#D7CCC8', '#EFEBE9'];

interface ChartDataPoint {
  name: string;
  value: number;
}

export const SalesByProductChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Performance por Produto (Faturamento x Lucro)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
            <RechartsTooltip formatter={(value: number | undefined) => value !== undefined ? `R$ ${value.toFixed(2)}` : ''} />
            <Legend />
            {/* Barra de Faturamento */}
            <Bar dataKey="value" name="Faturamento" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
            {/* Você precisaria passar o "profit" nos dados do App.tsx para esta segunda barra funcionar. 
                Por enquanto, vamos manter visualmente interessante só com o layout horizontal que é mais fácil de ler */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ChannelPieChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light">
    <h3 className="text-lg font-bold text-quintal-dark mb-4">Canais de Venda</h3>
    <div className="h-64">
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
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const InvestorEvolutionChart: React.FC<{ data: InvestorHistory[] }> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light lg:col-span-2">
    <h3 className="text-lg font-bold text-quintal-dark mb-4">Evolução Pagamentos Investidor</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="paid" stroke="#5D4037" strokeWidth={2} name="Realizado" />
          <Line type="monotone" dataKey="expected" stroke="#D7CCC8" strokeDasharray="5 5" name="Previsto" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);