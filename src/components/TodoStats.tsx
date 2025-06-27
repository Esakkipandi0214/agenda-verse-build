
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, TrendingUp, Target } from 'lucide-react';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    completionRate: number;
  };
}

const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: Circle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <Card key={stat.title} className="gradient-card border-0 shadow-lg animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            {stat.title === 'Completion Rate' && (
              <div className="mt-4">
                <Progress 
                  value={stats.completionRate} 
                  className="h-2"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TodoStats;
