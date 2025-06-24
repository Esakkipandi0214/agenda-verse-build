
import React from 'react';
import { useTodos } from '@/contexts/TodoContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, Target, Clock, Calendar, Tag, 
  CheckCircle2, AlertCircle, Circle 
} from 'lucide-react';
import { format, subDays, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

const AnalyticsDashboard = () => {
  const { todos, getAllTags } = useTodos();
  const allTags = getAllTags();

  // Basic stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  // Priority distribution
  const priorityData = [
    { name: 'High', value: todos.filter(t => t.priority === 'high').length, color: '#ef4444' },
    { name: 'Medium', value: todos.filter(t => t.priority === 'medium').length, color: '#f59e0b' },
    { name: 'Low', value: todos.filter(t => t.priority === 'low').length, color: '#10b981' }
  ];

  // Completion trend (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);
    
    const completed = todos.filter(todo => 
      todo.completed && 
      isAfter(todo.updatedAt, dayStart) && 
      isBefore(todo.updatedAt, dayEnd)
    ).length;

    return {
      date: format(date, 'MMM dd'),
      completed
    };
  });

  // Tag usage
  const tagData = allTags.map(tag => ({
    name: tag,
    count: todos.filter(todo => todo.tags.includes(tag)).length
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  // Overdue tasks
  const overdueTasks = todos.filter(todo => 
    !todo.completed && 
    todo.dueDate && 
    isBefore(todo.dueDate, new Date())
  ).length;

  // Due today
  const dueTodayTasks = todos.filter(todo => 
    !todo.completed && 
    todo.dueDate && 
    format(todo.dueDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ).length;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-3xl font-bold text-green-600">{completionRate}%</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress value={completionRate} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Tasks</p>
                <p className="text-3xl font-bold text-blue-600">{activeTodos}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Circle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-3xl font-bold text-red-600">{overdueTasks}</p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Today</p>
                <p className="text-3xl font-bold text-orange-600">{dueTodayTasks}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {priorityData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completion Trend */}
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              7-Day Completion Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tag Usage */}
      {tagData.length > 0 && (
        <Card className="gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Most Used Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={tagData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Quick Insights */}
      <Card className="gradient-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Productivity Stats</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Total tasks created: {totalTodos}</p>
                <p>• Tasks completed: {completedTodos}</p>
                <p>• Average completion rate: {completionRate}%</p>
                <p>• Most used priority: {priorityData.sort((a, b) => b.value - a.value)[0]?.name || 'None'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Task Management</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Tags in use: {allTags.length}</p>
                <p>• Tasks with due dates: {todos.filter(t => t.dueDate).length}</p>
                <p>• Overdue tasks: {overdueTasks}</p>
                <p>• Due today: {dueTodayTasks}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
