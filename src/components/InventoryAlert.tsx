import React from 'react';
import { AlertTriangle, ShoppingBag } from 'lucide-react';
import type { InventoryItem } from '../utils/dataProcessor';

export const InventoryAlert: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const lowStockItems = items.filter(item => item.current <= item.min);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
      <div className="flex items-center gap-2 mb-4 text-quintal-alert">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="text-lg font-bold">Alerta de Estoque</h3>
      </div>
      <div className="space-y-3">
        {lowStockItems.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full text-red-500">
                <ShoppingBag size={16} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.item}</p>
                <p className="text-xs text-red-600">
                  Atual: {item.current} {item.unit} (Min: {item.min})
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-red-700 border border-red-200 px-2 py-1 rounded bg-white">
              Repor
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};