
import React from 'react';
import { useTodos } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TodoList = () => {
  const { getFilteredTodos, filter, searchQuery, selectedTags } = useTodos();
  const todos = getFilteredTodos();

  const getEmptyMessage = () => {
    if (searchQuery) {
      return "No todos match your search";
    }
    if (selectedTags.length > 0) {
      return "No todos with selected tags";
    }
    if (filter === 'completed') {
      return "No completed todos yet";
    }
    if (filter === 'active') {
      return "No active todos";
    }
    return "No todos yet. Create your first one!";
  };

  if (todos.length === 0) {
    return (
      <Card className="gradient-card border-0 shadow-lg">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {getEmptyMessage()}
            </h3>
            <p className="text-gray-500">
              {todos.length === 0 && !searchQuery && selectedTags.length === 0
                ? "Start organizing your tasks and boost your productivity!"
                : "Try adjusting your filters or search terms."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Todos</span>
          <span className="text-sm font-normal text-gray-500">
            {todos.length} {todos.length === 1 ? 'item' : 'items'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todos.map((todo, index) => (
            <TodoItem key={todo.id} todo={todo} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
