import React, { useState, useMemo } from 'react';
import { Upload, Filter, LogOut } from 'lucide-react';
import { processCSV, type DashboardData } from './utils/dataProcessor';
import { KPICards } from './components/KPICards';
import { SalesByProductChart, ChannelPieChart, InvestorEvolutionChart } from './components/Charts';
import { InventoryAlert } from './components/InventoryAlert';
import { Login } from './components/Login';

interface ChartDataPoint {
  name: string;
  value: number;
}

const App: React.FC = () => {
  // 1. TODOS OS HOOKS DEVEM FICAR NO TOPO (ANTES DE QUALQUER RETURN)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [data, setData] = useState<DashboardData>({
    sales: [],
    inventory: [],
    investorData: {
      totalDebt: 0, paid: 0, history: [],
      currentDebt: 0
    }
  });
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Movi os useMemo para cima do return condicional
  const filteredSales = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return data.sales;
    // Aqui você pode implementar a lógica real de filtro de data se quiser
    return data.sales; 
  }, [data.sales, dateRange]);

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

  // Funções auxiliares
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processCSV(file, (processedData) => {
        setData(processedData);
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setData({ sales: [], inventory: [], investorData: { totalDebt: 0, paid: 0, history: [] } });
  };

  // 2. AGORA SIM O RETURN CONDICIONAL (DEPOIS DE TUDO CALCULADO)
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
          
          <div className="flex gap-3">
            <label className="flex items-center gap-2 bg-quintal-accent hover:bg-quintal-main transition px-4 py-2 rounded-lg cursor-pointer font-medium shadow-md">
              <Upload size={18} />
              Importar Planilha (.csv)
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-800/80 hover:bg-red-700 transition px-4 py-2 rounded-lg font-medium shadow-md text-sm"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Aviso de Lista Vazia */}
        {data.sales.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded shadow-sm">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong className="font-bold">Atenção:</strong> Nenhum dado carregado. 
                  Clique em "Importar Planilha" no topo e selecione seu arquivo CSV para visualizar os gráficos.
                </p>
              </div>
            </div>
          </div>
        )}

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

        <KPICards 
          totalRevenue={stats.totalRevenue} 
          totalProfit={stats.totalProfit} 
          debtBalance={data.investorData.totalDebt - data.investorData.paid} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SalesByProductChart data={stats.salesByProduct} />
            <InvestorEvolutionChart data={data.investorData.history} />
          </div>

          <div className="space-y-6">
            <InventoryAlert items={data.inventory} />
            <ChannelPieChart data={stats.salesByChannel} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;