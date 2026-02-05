import React from 'react';
import { DollarSign, TrendingUp, Wallet, Target, Percent } from 'lucide-react';

interface KPICardsProps {
  totalRevenue: number;
  totalProfit: number;
  debtBalance: number;
  totalSalesCount: number;
}

export const KPICards: React.FC<KPICardsProps> = ({ 
  totalRevenue, 
  totalProfit, 
  debtBalance,
  totalSalesCount 
}) => {
  
  const ticketAverage = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;
  // Cálculo da Margem Líquida (%)
  const marginPercentage = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  
  // Meta de Exemplo
  const profitGoal = 2000; 
  const progressPercentage = Math.min((totalProfit / profitGoal) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      
      {/* 1. Faturamento */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-quintal-light">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Faturamento</p>
            <h3 className="text-xl font-bold text-gray-800 mt-1">
              R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <TrendingUp size={18} />
          </div>
        </div>
      </div>

      {/* 2. Lucro Líquido */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-quintal-light relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lucro Líquido</p>
            <h3 className="text-xl font-bold text-green-600 mt-1">
              R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] text-gray-400 mt-0.5">Meta: R$ {profitGoal}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg text-green-600">
            <DollarSign size={18} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-1 bg-green-100 w-full">
           <div className="h-full bg-green-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* 3. Margem (NOVO) */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-quintal-light">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Margem Real</p>
            <h3 className="text-xl font-bold text-emerald-600 mt-1">
              {marginPercentage.toFixed(1)}%
            </h3>
            <p className="text-[10px] text-gray-400 mt-0.5">Saúde do negócio</p>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Percent size={18} />
          </div>
        </div>
      </div>

      {/* 4. Ticket Médio */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-quintal-light">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ticket Médio</p>
            <h3 className="text-xl font-bold text-purple-600 mt-1">
              R$ {ticketAverage.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
            <Target size={18} />
          </div>
        </div>
      </div>

      {/* 5. Saldo Investidor */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-quintal-light border-l-4 border-l-red-400">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Saldo Devedor</p>
            <h3 className="text-xl font-bold text-red-600 mt-1">
              R$ {debtBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <Wallet size={18} />
          </div>
        </div>
      </div>

    </div>
  );
};