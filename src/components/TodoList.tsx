
import React from 'react';
import { useTodos } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Move } from 'lucide-react';

const TodoList = () => {
  const { getFilteredTodos, filter, searchQuery, selectedTags, reorderTodos, todos } = useTodos();
  const filteredTodos = getFilteredTodos();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = filteredTodos.findIndex((todo) => todo.id === active.id);
      const newIndex = filteredTodos.findIndex((todo) => todo.id === over.id);
      
      // Find the actual indices in the full todos array
      const actualOldIndex = todos.findIndex((todo) => todo.id === active.id);
      const actualNewIndex = todos.findIndex((todo) => todo.id === over.id);
      
      reorderTodos(actualOldIndex, actualNewIndex);
    }
  };

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

  if (filteredTodos.length === 0) {
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
              {filteredTodos.length === 0 && !searchQuery && selectedTags.length === 0
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
          <div className="flex items-center gap-2">
            <span>Your Todos</span>
            <Move className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-normal text-gray-500">Drag to reorder</span>
          </div>
          <span className="text-sm font-normal text-gray-500">
            {filteredTodos.length} {filteredTodos.length === 1 ? 'item' : 'items'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={filteredTodos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {filteredTodos.map((todo, index) => (
                <TodoItem key={todo.id} todo={todo} index={index} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};

export default TodoList;
