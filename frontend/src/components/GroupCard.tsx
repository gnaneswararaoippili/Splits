import React from 'react';
import { Group } from '../types';
import { Users, Calendar } from 'lucide-react';

interface GroupCardProps {
  group: Group;
  onClick: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {group.name}
        </h3>
        <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      
      {group.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>{group.members.length} members</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(group.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};