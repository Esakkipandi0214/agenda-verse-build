
import React, { useState } from 'react';
import { useTodos, Todo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import TodoForm from './TodoForm';
import { Edit, Trash2, MoreVertical, Calendar, Clock, GripVertical } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import {
  useSortable,
} from '@dnd-kit/sortable';
import {
  CSS,
} from '@dnd-kit/utilities';

interface TodoItemProps {
  todo: Todo;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d, yyyy');
  };

  const isDueToday = todo.dueDate && isToday(todo.dueDate);
  const isOverdue = todo.dueDate && isPast(todo.dueDate) && !isToday(todo.dueDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group py-3 rounded-lg border bg-white/50 hover:bg-white/70 transition-all duration-200
        hover:shadow-md hover:scale-[1.02] animate-slide-up
        ${todo.completed ? 'opacity-60' : ''}
        ${isOverdue && !todo.completed ? 'border-red-200 bg-red-50/50' : ''}
        ${isDueToday && !todo.completed ? 'border-yellow-200 bg-yellow-50/50' : ''}
        ${isDragging ? 'z-50 shadow-2xl' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mt-1 p-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 sm:mb-1">
                <div className={`w-2 h-2 hidden sm:flex rounded-full ${getPriorityDot(todo.priority)}`} />
                <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </h3>
                <Badge className={`text-xs ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </Badge>
              </div>              
              <div className="sm:flex space-y-2 sm:space-y-0  sm:items-center justify-between sm:justify-start sm:gap-4 text-xs text-gray-500">
                {todo.dueDate && (
                  <div className={`flex items-center justify-between sm:justify-start gap-1 ${
                    isOverdue && !todo.completed ? 'text-red-600' : 
                    isDueToday && !todo.completed ? 'text-yellow-600' : ''
                  }`}>
                    <Calendar className="w-3 h-3" />
                    <span>{formatDueDate(todo.dueDate)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between sm:justify-start gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Created {format(todo.createdAt, 'MMM d')}</span>
                </div>
              </div>
               {todo.description && (
                <p className={`text-sm py-2 px-1 my-1 rounded-md sm:p-4 bg-gray-500/10 text-gray-600 mb-2 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}
              
              {todo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {todo.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Todo</DialogTitle>
                    </DialogHeader>
                    <TodoForm
                      initialData={todo}
                      onSuccess={() => setIsEditModalOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
