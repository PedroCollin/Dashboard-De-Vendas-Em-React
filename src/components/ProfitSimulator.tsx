import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface SimulatorProps {
  currentRevenue: number;
  currentMargin: number; // Margem em porcentagem (0 a 100)
}

export const ProfitSimulator: React.FC<SimulatorProps> = ({ currentRevenue, currentMargin }) => {
  const [growth, setGrowth] = useState<number>(20); // Começa simulando 20% de crescimento

  const simulatedRevenue = currentRevenue * (1 + growth / 100);
  const simulatedProfit = simulatedRevenue * (currentMargin / 100);
  const extraProfit = simulatedProfit - (currentRevenue * (currentMargin / 100));

  return (
    <div className="bg-gradient-to-br from-quintal-dark to-gray-800 p-6 rounded-xl shadow-lg text-white">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-quintal-accent" />
        <h3 className="text-lg font-bold">Simulador de Potencial</h3>
      </div>
      
      <div className="mb-6">
        <label className="text-sm text-gray-300 mb-2 block">Se as vendas crescerem:</label>
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="0" 
            max="200" 
            value={growth} 
            onChange={(e) => setGrowth(Number(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-quintal-accent"
          />
          <span className="font-bold text-quintal-accent w-12">{growth}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-white/10 p-4 rounded-lg">
        <div>
          <p className="text-xs text-gray-400">Novo Faturamento Estimado</p>
          <p className="text-xl font-bold">R$ {simulatedRevenue.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Lucro Extra Gerado</p>
          <p className="text-xl font-bold text-green-400 flex items-center gap-1">
            + R$ {extraProfit.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 italic">
        *Baseado na sua margem atual de {currentMargin.toFixed(1)}%.
      </p>
    </div>
  );
};