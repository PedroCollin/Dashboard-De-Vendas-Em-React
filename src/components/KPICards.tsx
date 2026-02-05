import React from 'react';
import { DollarSign, TrendingUp, Wallet, Target } from 'lucide-react';

interface KPICardsProps {
  totalRevenue: number;
  totalProfit: number;
  debtBalance: number;
  totalSalesCount: number; // Novo prop para calcular ticket médio
}

export const KPICards: React.FC<KPICardsProps> = ({ 
  totalRevenue, 
  totalProfit, 
  debtBalance,
  totalSalesCount 
}) => {
  
  // Cálculo do Ticket Médio
  const ticketAverage = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;
  
  // Definição de Meta (Exemplo: R$ 2.000,00 de lucro no mês)
  const profitGoal = 2000; 
  const progressPercentage = Math.min((totalProfit / profitGoal) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Faturamento */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Faturamento Total</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Lucro Líquido + Meta Visual */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-sm font-medium text-gray-500">Lucro Líquido</p>
            <h3 className="text-2xl font-bold text-green-600 mt-1">
              R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-xs text-gray-400 mt-1">Meta: R$ {profitGoal}</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg text-green-600">
            <DollarSign size={20} />
          </div>
        </div>
        
        {/* Barra de Progresso da Meta (Fundo sutil) */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-green-100 w-full">
           <div 
             className="h-full bg-green-500 transition-all duration-1000" 
             style={{ width: `${progressPercentage}%` }}
           ></div>
        </div>
      </div>

      {/* Ticket Médio (NOVO) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
            <h3 className="text-2xl font-bold text-purple-600 mt-1">
              R$ {ticketAverage.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-xs text-gray-400 mt-1">Por cliente</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
            <Target size={20} />
          </div>
        </div>
      </div>

      {/* Saldo Investidor */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Saldo Devedor</p>
            <h3 className="text-2xl font-bold text-red-600 mt-1">
              R$ {debtBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <Wallet size={20} />
          </div>
        </div>
      </div>

    </div>
  );
};