import React from 'react';
import type { Expense } from '../utils/dataProcessor';

interface ExpensesTableProps {
  expenses: Expense[];
}

export const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
  // Calcula o total gasto
  const totalPaid = expenses
    .filter(e => e.status.toLowerCase() === 'pago')
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalPending = expenses
    .filter(e => e.status.toLowerCase() === 'à pagar')
    .reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-quintal-light overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Tabela de Custos e Despesas</h3>
        <div className="text-sm space-x-4">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
            Pago: R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded">
            A Pagar: R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Categoria</th>
              <th className="py-3 px-4">Qtd</th>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4">Valor</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-medium text-gray-800">{expense.description}</td>
                <td className="py-3 px-4 text-gray-500">
                  <span className={`px-2 py-0.5 rounded text-xs border ${
                    expense.category === 'Matéria-prima' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                    expense.category === 'Equipamento' ? 'bg-purple-50 border-purple-100 text-purple-700' :
                    'bg-gray-50 border-gray-200 text-gray-600'
                  }`}>
                    {expense.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{expense.quantity} {expense.unit}</td>
                <td className="py-3 px-4 text-gray-500">{expense.date}</td>
                <td className="py-3 px-4 font-medium">
                  R$ {expense.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    expense.status.toLowerCase() === 'pago' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {expense.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};