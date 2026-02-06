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

export interface Expense {
  id: string;
  description: string;
  category: string;
  value: number;
  status: string;
  date: string;
  quantity: number;
  unit: string;
}

export interface DashboardData {
  sales: Sale[];
  inventory: InventoryItem[];
  investorData: InvestorData;
  expenses: Expense[];
}

// --- DADOS MOCKADOS (VENDAS ATUALIZADAS) ---

const MOCK_SALES: Sale[] = [
  { 
    id: '1', 
    productName: 'Brownie', 
    quantity: 1, 
    channel: 'Whatsapp', 
    revenue: 10.00, 
    profit: 7.50, // 10.00 - 2.50
    date: '30/01/2026' 
  },
  { 
    id: '2', 
    productName: 'Mini Brownie', 
    quantity: 35, 
    channel: 'Whatsapp', 
    revenue: 74.90, 
    profit: 41.65, // 74.90 - 33.25
    date: '02/02/2026' 
  },
  { 
    id: '3', 
    productName: 'Brownie', 
    quantity: 2, 
    channel: 'Whatsapp', 
    revenue: 20.00, 
    profit: 15.00, // 20.00 - 5.00
    date: '02/02/2026' 
  },
    { 
    id: '3', 
    productName: 'Brownie', 
    quantity: 2, 
    channel: 'Whatsapp', 
    revenue: 20.00, 
    profit: 15.00, // 20.00 - 5.00
    date: '02/02/2026' 
  },
  { 
    id: '3', 
    productName: 'Brownie', 
    quantity: 1, 
    channel: 'Presencial', 
    revenue: 10.00, 
    profit: 7.50, // 10.00 - 2.50
    date: '05/02/2026' 
  }
];

const MOCK_INVENTORY: InventoryItem[] = [
  { id: 1, item: 'Leite Condensado', current: 20, min: 10, unit: 'latas' },
  { id: 2, item: 'Cacau em Pó', current: 3, min: 2, unit: 'kg' },
  { id: 3, item: 'Chocolate Nobre', current: 5, min: 3, unit: 'kg' },
  { id: 4, item: 'Embalagens', current: 150, min: 50, unit: 'unid' },
];

const MOCK_INVESTOR: InvestorData = {
  totalDebt: 3000,
  paid: 0,
  history: [
    { month: 'Mês 1', paid: 0, expected: 350 },
    { month: 'Mês 2', paid: 0, expected: 350 },
  ]
};

// Dados de Custos (Mantidos da mensagem anterior)
const MOCK_EXPENSES: Expense[] = [
  { id: '1', description: 'Margarina', category: 'Matéria-prima', value: 32.70, status: 'Pago', date: '30/01/2026', quantity: 3, unit: 'KG' },
  { id: '2', description: 'Farinha', category: 'Matéria-prima', value: 4.49, status: 'Pago', date: '30/01/2026', quantity: 1, unit: 'KG' },
  { id: '3', description: 'Açucar', category: 'Matéria-prima', value: 8.36, status: 'Pago', date: '30/01/2026', quantity: 2, unit: 'KG' },
  { id: '4', description: 'Caixa de pizza', category: 'Embalagem', value: 30.90, status: 'Pago', date: '30/01/2026', quantity: 30, unit: 'UN' },
  { id: '5', description: 'Chocolate Fracionado', category: 'Matéria-prima', value: 55.90, status: 'Pago', date: '30/01/2026', quantity: 2, unit: 'KG' },
  { id: '6', description: 'Granulado Floco Macio', category: 'Matéria-prima', value: 57.99, status: 'Pago', date: '30/01/2026', quantity: 2.5, unit: 'KG' },
  { id: '7', description: 'Chocolate nobre', category: 'Matéria-prima', value: 142.99, status: 'Pago', date: '30/01/2026', quantity: 2.1, unit: 'KG' },
  { id: '8', description: 'Chocolate em pó', category: 'Matéria-prima', value: 44.90, status: 'Pago', date: '30/01/2026', quantity: 1, unit: 'KG' },
  { id: '9', description: 'Granulado Pistache', category: 'Matéria-prima', value: 4.99, status: 'Pago', date: '30/01/2026', quantity: 0.8, unit: 'KG' },
  { id: '10', description: 'Leite condensado', category: 'Matéria-prima', value: 267.96, status: 'Pago', date: '30/01/2026', quantity: 20, unit: 'KG' },
  { id: '11', description: 'Creme de leite', category: 'Matéria-prima', value: 63.96, status: 'Pago', date: '30/01/2026', quantity: 4, unit: 'KG' },
  { id: '12', description: 'Glucose', category: 'Matéria-prima', value: 16.79, status: 'Pago', date: '30/01/2026', quantity: 1, unit: 'KG' },
  { id: '13', description: 'Espatula Silicone', category: 'Equipamento', value: 26.89, status: 'Pago', date: '30/01/2026', quantity: 1, unit: 'UN' },
  { id: '14', description: 'Forma Papel Brigadeiro', category: 'Embalagem', value: 14.94, status: 'Pago', date: '30/01/2026', quantity: 6, unit: 'PCT' },
  { id: '15', description: 'Forma Papel Brigadeiro Branco', category: 'Embalagem', value: 10.14, status: 'Pago', date: '30/01/2026', quantity: 6, unit: 'PCT' },
  { id: '16', description: 'Etiqueta Data Validade', category: 'Embalagem', value: 2.89, status: 'Pago', date: '30/01/2026', quantity: 100, unit: 'UN' },
  { id: '17', description: 'Folha Transparente Brownie', category: 'Embalagem', value: 4.89, status: 'Pago', date: '30/01/2026', quantity: 1000, unit: 'UN' },
  { id: '18', description: 'Blister Brigadeiro', category: 'Embalagem', value: 63.49, status: 'Pago', date: '30/01/2026', quantity: 500, unit: 'UN' },
  { id: '19', description: 'Panela de Brigadeiros', category: 'Equipamento', value: 1406.00, status: 'Pago', date: '29/01/2026', quantity: 2, unit: 'UN' },
  { id: '20', description: 'Porconadoras de brigadeiro', category: 'Equipamento', value: 311.10, status: 'Pago', date: '29/01/2026', quantity: 2, unit: 'UN' },
  { id: '21', description: 'Expositora de Brigadeiro', category: 'Equipamento', value: 145.00, status: 'Pago', date: '02/02/2026', quantity: 1, unit: 'UN' },
  { id: '22', description: 'Kit aro + Forma Brownie', category: 'Equipamento', value: 127.96, status: 'à pagar', date: '02/02/2026', quantity: 2, unit: 'UN' },
  { id: '23', description: 'Vasilhas para Armazenamento', category: 'Equipamento', value: 139.90, status: 'à pagar', date: '02/02/2026', quantity: 10, unit: 'UN' },
];

export const initialData: DashboardData = {
  sales: MOCK_SALES,
  inventory: MOCK_INVENTORY,
  investorData: MOCK_INVESTOR,
  expenses: MOCK_EXPENSES
};