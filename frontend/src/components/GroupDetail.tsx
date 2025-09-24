import React, { useState, useMemo } from 'react';
import { Group, Expense } from '../types';
import { calculateBalances, getSettlementSuggestions } from '../utils/calculations';
import { ExpenseCard } from './ExpenseCard';
import { BalanceCard } from './BalanceCard';
import { Modal } from './Modal';
import { AddExpenseForm } from './AddExpenseForm';
import { Plus, ArrowLeft, Users, Calculator, Receipt } from 'lucide-react';

interface GroupDetailProps {
  group: Group;
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onBack: () => void;
}

export const GroupDetail: React.FC<GroupDetailProps> = ({
  group,
  expenses,
  onAddExpense,
  onBack
}) => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [activeTab, setActiveTab] = useState<'expenses' | 'balances' | 'settlements'>('expenses');

  const balances = useMemo(() => calculateBalances(expenses, group.members), [expenses, group.members]);
  const settlements = useMemo(() => getSettlementSuggestions(balances), [balances]);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    onAddExpense(expense);
    setShowAddExpense(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Groups</span>
          </button>
          <button
            onClick={() => setShowAddExpense(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{group.name}</h1>
            {group.description && (
              <p className="text-gray-600">{group.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Receipt className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ₹{totalExpenses.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Total Expenses</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {group.members.length}
              </div>
              <div className="text-sm text-gray-500">Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'expenses'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Expenses ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('balances')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'balances'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Balances
        </button>
        <button
          onClick={() => setActiveTab('settlements')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'settlements'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Settlements
        </button>
      </div>

      {/* Content */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
              <p className="text-gray-600 mb-4">Start by adding your first expense to this group.</p>
              <button
                onClick={() => setShowAddExpense(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add First Expense
              </button>
            </div>
          ) : (
            expenses.map(expense => (
              <ExpenseCard key={expense.id} expense={expense} members={group.members} />
            ))
          )}
        </div>
      )}

      {activeTab === 'balances' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {balances.map(balance => (
            <BalanceCard key={balance.memberId} balance={balance} />
          ))}
        </div>
      )}

      {activeTab === 'settlements' && (
        <div className="space-y-6">
          {settlements.length === 0 ? (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All settled up!</h3>
              <p className="text-gray-600">Everyone's balances are even.</p>
            </div>
          ) : (
            settlements.map((settlement, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-medium text-gray-900">
                      {settlement.fromName} owes {settlement.toName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Suggested settlement
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{settlement.amount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <Modal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        title="Add New Expense"
      >
        <AddExpenseForm
          groupId={group.id}
          members={group.members}
          onSubmit={handleAddExpense}
          onCancel={() => setShowAddExpense(false)}
        />
      </Modal>
    </div>
  );
};