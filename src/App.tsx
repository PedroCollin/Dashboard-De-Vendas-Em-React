import React, { useState, useMemo } from 'react';
import { Filter, LogOut } from 'lucide-react';
import { initialData, type DashboardData } from './utils/dataProcessor';
import { KPICards } from './components/KPICards';
import { SalesByProductChart, ChannelPieChart, InvestorEvolutionChart } from './components/Charts';
import { InventoryAlert } from './components/InventoryAlert';
import { ExpensesTable } from './components/ExpenseTable';
// Novos componentes importados (lembre-se de ter criado os arquivos deles na pasta components)
import { CostBreakdownChart } from './components/CostBreakdownChart';
import { ProfitSimulator } from './components/ProfitSimulator';
import { Login } from './components/Login';

interface ChartDataPoint {
  name: string;
  value: number;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [data] = useState<DashboardData>(initialData);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Lógica de Filtro
  const filteredSales = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return data.sales;
    // Aqui você pode adicionar lógica de data real se necessário
    return data.sales;
  }, [data.sales, dateRange]);

  // Cálculos Estatísticos
  const stats = useMemo(() => {
    const totalRevenue = filteredSales.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalProfit = filteredSales.reduce((acc, curr) => acc + curr.profit, 0);

    const productMap = filteredSales.reduce((acc, curr) => {
      if (!acc[curr.productName]) acc[curr.productName] = { name: curr.productName, value: 0 };
      acc[curr.productName].value += curr.revenue;
      return acc;
    }, {} as Record<string, ChartDataPoint>);

    const salesByProduct = Object.values(productMap);

    const channelMap = filteredSales.reduce((acc, curr) => {
      if (!acc[curr.channel]) acc[curr.channel] = { name: curr.channel, value: 0 };
      acc[curr.channel].value += 1;
      return acc;
    }, {} as Record<string, ChartDataPoint>);

    const salesByChannel = Object.values(channelMap);

    return { totalRevenue, totalProfit, salesByProduct, salesByChannel };
  }, [filteredSales]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Calcula a margem atual (%) para passar ao Simulador
  const currentMargin = stats.totalRevenue > 0 
    ? (stats.totalProfit / stats.totalRevenue) * 100 
    : 0;

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-quintal-bg font-sans text-gray-800">
      <header className="bg-quintal-dark text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Quintal <span className="text-quintal-accent font-light">Doceria</span></h1>
            <p className="text-quintal-light text-sm mt-1">Painel de Controle Gerencial</p>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-800/80 hover:bg-red-700 transition px-4 py-2 rounded-lg font-medium shadow-md text-sm"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-quintal-light">
            <div className="flex items-center gap-2 text-quintal-main font-semibold">
                <Filter size={20} />
                <span>Filtros:</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">De:</span>
                <input 
                    type="date" 
                    className="border rounded p-1 text-sm bg-gray-50"
                    onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
                />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Até:</span>
                <input 
                    type="date" 
                    className="border rounded p-1 text-sm bg-gray-50"
                    onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
                />
            </div>
        </div>

        {/* Cards KPI (Atualizado com Ticket Médio e Margem) */}
        <KPICards 
          totalRevenue={stats.totalRevenue} 
          totalProfit={stats.totalProfit} 
          debtBalance={data.investorData.totalDebt - data.investorData.paid}
          totalSalesCount={filteredSales.length} 
        />

        {/* --- NOVO LAYOUT DE GRÁFICOS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna Principal: Vendas, Investidor e Simulador */}
          <div className="lg:col-span-2 space-y-6">
            <SalesByProductChart data={stats.salesByProduct} />
            
            <InvestorEvolutionChart data={data.investorData.history} />
            
            {/* O "Brinquedo" do Investidor */}
            <ProfitSimulator 
                currentRevenue={stats.totalRevenue} 
                currentMargin={currentMargin} 
            />
          </div>

          {/* Coluna Lateral: Alertas, Custos e Canais */}
          <div className="space-y-6">
            <InventoryAlert items={data.inventory} />
            
            {/* Novo Gráfico de Custos */}
            <CostBreakdownChart expenses={data.expenses} />
            
            <ChannelPieChart data={stats.salesByChannel} />
          </div>
        </div>

        {/* Tabela Detalhada de Custos */}
        <div className="mt-8">
            <ExpensesTable expenses={data.expenses} />
        </div>

      </main>
    </div>
  );
};

export default App;