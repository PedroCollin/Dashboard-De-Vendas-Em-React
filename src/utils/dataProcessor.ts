import Papa from 'papaparse';

// --- Interfaces ---
export interface Sale {
  id: string;
  productName: string;
  quantity: number;
  channel: string;
  revenue: number;
  profit: number;
  date: string;
}

export interface InventoryItem {
  id: number;
  item: string;
  current: number;
  min: number;
  unit: string;
}

export interface InvestorHistory {
  month: string;
  paid: number;
  expected: number;
}

export interface InvestorData {
  totalDebt: number;
  paid: number;
  history: InvestorHistory[];
}

export interface DashboardData {
  sales: Sale[];
  inventory: InventoryItem[];
  investorData: InvestorData;
}

// --- Funções Auxiliares ---

// Remove R$, pontos e converte para número
const parseCurrency = (value: any): number => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return parseFloat(value.toString().replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
};

// Limpa o ID (transforma "3.0" em "3")
const cleanId = (value: any): string => {
  if (!value) return '';
  return value.toString().split('.')[0].trim(); 
};

export const processCSV = (file: File, callback: (data: DashboardData) => void) => {
  Papa.parse(file, {
    header: true,
    encoding: "UTF-8", // Tente "ISO-8859-1" se os acentos aparecerem errados
    skipEmptyLines: true,
    complete: (results) => {
      const rawData = results.data as any[];
      
      // 1. CRIA O MAPA DE PRODUTOS (Olhando a tabela da direita)
      // Exemplo: cria uma memória { "1": "Brigadeiro", "3": "Brownie" }
      const productMap: Record<string, string> = {};
      
      rawData.forEach((row: any) => {
        // Colunas da direita: 'Id dos produtos' e 'Produtos'
        const refId = cleanId(row['Id dos produtos']);
        const refName = row['Produtos'];
        
        if (refId && refName) {
          productMap[refId] = refName;
        }
      });

      // 2. PROCESSA AS VENDAS (Olhando a tabela da esquerda)
      const sales: Sale[] = rawData
        .filter((row: any) => row['Produto'] && row['Quantidade Vendida']) // Filtra linhas vazias de venda
        .map((row: any) => {
          const saleId = cleanId(row['Produto']);
          
          // AQUI ESTÁ A MÁGICA:
          // Em vez de pegar row['Produtos'] (que pode estar errado na linha),
          // buscamos no mapa que criamos acima usando o ID da venda.
          const correctName = productMap[saleId] || `Produto ${saleId}`;

          return {
            id: saleId,
            productName: correctName, 
            quantity: parseFloat(row['Quantidade Vendida']),
            channel: row['Canal de Venda'] || 'Presencial',
            revenue: parseCurrency(row['Faturamento Bruto']),
            profit: parseCurrency(row['Lucro']),
            date: row['Data'] || new Date().toLocaleDateString('pt-BR'), 
          };
        });

      // Dados de Estoque (Simulados - Preencha conforme necessidade)
      const inventory: InventoryItem[] = [
        { id: 1, item: 'Leite Condensado', current: 5, min: 10, unit: 'latas' },
        { id: 2, item: 'Cacau em Pó', current: 2, min: 5, unit: 'kg' },
        { id: 3, item: 'Farinha de Trigo', current: 20, min: 10, unit: 'kg' },
      ];

      // Dados do Investidor (Simulados)
      const investorData: InvestorData = {
        totalDebt: 50000,
        paid: 12500,
        history: [
          { month: 'Jan', paid: 1000, expected: 1000 },
          { month: 'Fev', paid: 1200, expected: 1000 },
        ]
      };

      callback({ sales, inventory, investorData });
    },
    error: (error: any) => {
      console.error("Erro ao ler CSV:", error);
    }
  });
};