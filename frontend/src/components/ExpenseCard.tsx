import React from 'react';
import { Expense, Member } from '../types';
import { Calendar, User, Users, Tag } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

interface ExpenseCardProps {
  expense: Expense;
  members: Member[];
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, members }) => {
  const paidByMember = members.find(m => m.id === expense.paidBy);
  const splitAmongMembers = members.filter(m => expense.splitAmong.includes(m.id));
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{expense.description}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(expense.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>{expense.category}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(expense.amount)}
          </div>
          {expense.settled && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
              Settled
            </span>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <User className="w-4 h-4" />
              <span>Paid by</span>
            </div>
            <div className="font-medium text-gray-900">
              {paidByMember?.name || 'Unknown'}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <Users className="w-4 h-4" />
              <span>Split among</span>
            </div>
            <div className="font-medium text-gray-900">
              {splitAmongMembers.map(m => m.name).join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};