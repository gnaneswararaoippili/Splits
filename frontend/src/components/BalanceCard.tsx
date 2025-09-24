import React from 'react';
import { Balance } from '../types';
import { formatCurrency } from '../utils/calculations';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceCardProps {
  balance: Balance;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  const isPositive = balance.balance > 0;
  const isNegative = balance.balance < 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            isPositive ? 'bg-green-100' : isNegative ? 'bg-red-100' : 'bg-gray-100'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : isNegative ? (
              <TrendingDown className="w-5 h-5 text-red-600" />
            ) : (
              <div className="w-5 h-5 bg-gray-400 rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{balance.memberName}</h3>
            <p className="text-sm text-gray-500">
              {isPositive ? 'Should receive' : isNegative ? 'Owes' : 'All settled'}
            </p>
          </div>
        </div>
        <div className={`text-xl font-bold ${
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
        }`}>
          {Math.abs(balance.balance) < 0.01 ? formatCurrency(0) : formatCurrency(Math.abs(balance.balance))}
        </div>
      </div>
    </div>
  );
};