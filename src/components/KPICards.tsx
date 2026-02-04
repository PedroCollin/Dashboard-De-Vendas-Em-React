import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, type LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  type?: 'neutral' | 'success' | 'warning';
}

const Card: React.FC<CardProps> = ({ title, value, icon: Icon, type = 'neutral' }) => {
  const colors = {
    neutral: 'bg-white border-quintal-light text-quintal-dark',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
  };

  return (
    <div className={`p-6 rounded-xl border shadow-sm ${colors[type]} flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="p-3 bg-white/50 rounded-full">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

interface KPICardsProps {
  totalRevenue: number;
  totalProfit: number;
  debtBalance: number;
}

export const KPICards: React.FC<KPICardsProps> = ({ totalRevenue, totalProfit, debtBalance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        title="Faturamento Bruto" 
        value={`R$ ${totalRevenue.toFixed(2)}`} 
        icon={DollarSign} 
      />
      <Card 
        title="Lucro Acumulado" 
        value={`R$ ${totalProfit.toFixed(2)}`} 
        icon={TrendingUp} 
        type="success"
      />
      <Card 
        title="Saldo Devedor (Investidor)" 
        value={`R$ ${debtBalance.toFixed(2)}`} 
        icon={AlertCircle} 
        type="warning"
      />
    </div>
  );
};