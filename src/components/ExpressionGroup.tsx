import React from 'react';
import { Flag } from 'lucide-react';
import ExpressionCard from './ExpressionCard';
import { ConceptGroup } from '../types/expressions';

interface ExpressionGroupProps {
  group: ConceptGroup;
}

const ExpressionGroup: React.FC<ExpressionGroupProps> = ({ group }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white">
          <Flag className="h-6 w-6" />
          <h2 className="text-2xl font-bold">{group.concept}</h2>
        </div>
        <p className="text-blue-100">{group.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.expressions.map((expression, index) => (
          <ExpressionCard key={index} expression={expression} />
        ))}
      </div>
    </div>
  );
};

export default ExpressionGroup; 