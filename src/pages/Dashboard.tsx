
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTodos } from '@/contexts/TodoContext';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoStats from '@/components/TodoStats';
import TodoFilters from '@/components/TodoFilters';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LogOut, Plus, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { getStats } = useTodos();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TodoVerse
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary hover:opacity-90 transition-opacity">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Todo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Todo</DialogTitle>
                  </DialogHeader>
                  <TodoForm onSuccess={() => setIsAddModalOpen(false)} />
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats Overview */}
          <div className="lg:col-span-4">
            <TodoStats stats={stats} />
          </div>

          {/* Filters */}
          <div className="lg:col-span-4">
            <TodoFilters />
          </div>

          {/* Todo List */}
          <div className="lg:col-span-4">
            <TodoList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
