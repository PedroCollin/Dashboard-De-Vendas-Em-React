import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import type { InvestorHistory } from '../utils/dataProcessor';

const COLORS = ['#5D4037', '#8D6E63', '#A1887F', '#D7CCC8', '#EFEBE9'];

interface ChartDataPoint {
  name: string;
  value: number;
}

export const SalesByProductChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light">
    <h3 className="text-lg font-bold text-quintal-dark mb-4">Vendas por Produto</h3>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{fill: '#5D4037'}} />
          <YAxis tick={{fill: '#5D4037'}} />
          <Tooltip 
            contentStyle={{backgroundColor: '#FFF', borderColor: '#D7CCC8'}} 
            itemStyle={{color: '#3E2723'}}
          />
          <Bar dataKey="value" fill="#5D4037" radius={[4, 4, 0, 0]} name="Vendas (R$)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

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