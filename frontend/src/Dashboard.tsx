import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Group, Expense } from './types';
import * as api from './api';
import { GroupCard } from './components/GroupCard';
import { GroupDetail } from './components/GroupDetail';
import { Modal } from './components/Modal';
import { CreateGroupForm } from './components/CreateGroupForm';
import { Plus, Users, Receipt, Calculator } from 'lucide-react';

type DashboardProps = {
  onLogout: () => void;
};

function Dashboard({ onLogout }: DashboardProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const gs = await api.fetchGroups();
        setGroups(gs);
      } catch (err) {
        console.error('Failed to load groups', err);
      }
    })();
  }, []);

  const handleCreateGroup = async (groupData: Omit<Group, 'id' | 'createdAt'>) => {
    try {
      const newGroup = await api.createGroup(groupData);
      setGroups(prev => [...prev, newGroup]);
      setShowCreateGroup(false);
    } catch (err) {
      console.error('Failed to create group', err);
    }
  };

  const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      const newExpense = await api.createExpense(expenseData);
      setExpenses(prev => [...prev, newExpense]);
    } catch (err) {
      console.error('Failed to add expense', err);
    }
  };

  const getGroupExpenses = (groupId: string) => {
    return expenses.filter(expense => String(expense.groupId) === String(groupId));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const totalGroups = groups.length;

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <GroupDetail
          group={selectedGroup}
          expenses={getGroupExpenses(selectedGroup.id)}
          onAddExpense={handleAddExpense}
          onBack={() => setSelectedGroup(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Splits</h1>
            <p className="text-xl text-gray-600">Simplify your shared expenses</p>
          </div>

          {/* Right side buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:underline"
            >
              Sign Out
            </button>
            <button
              onClick={() => setShowCreateGroup(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Create Group</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalGroups}</div>
                <div className="text-sm text-gray-600">Active Groups</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-3 rounded-lg">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{expenses.length}</div>
                <div className="text-sm text-gray-600">Total Expenses</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-600 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{totalExpenses.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {groups.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Splits!</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start by creating your first group to track shared expenses with friends,
              roommates, or travel companions.
            </p>
            <button
              onClick={() => setShowCreateGroup(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-sm"
            >
              Create Your First Group
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
              <div className="text-sm text-gray-600">
                {groups.length} {groups.length === 1 ? 'group' : 'groups'}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onClick={() => setSelectedGroup(group)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for Create Group */}
      <Modal
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        title="Create New Group"
      >
        <CreateGroupForm
          onSubmit={handleCreateGroup}
          onCancel={() => setShowCreateGroup(false)}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
