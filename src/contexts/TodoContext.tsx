
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  order: number;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  selectedTags: string[];
}

type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REORDER_TODOS'; payload: { sourceIndex: number; destinationIndex: number } }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_SORT'; payload: { sortBy: TodoState['sortBy']; sortOrder: TodoState['sortOrder'] } }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_SELECTED_TAGS'; payload: string[] };

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  searchQuery: '',
  selectedTags: [],
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date() }
            : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        ),
      };
    case 'REORDER_TODOS':
      const newTodos = [...state.todos];
      const [reorderedItem] = newTodos.splice(action.payload.sourceIndex, 1);
      newTodos.splice(action.payload.destinationIndex, 0, reorderedItem);
      return {
        ...state,
        todos: newTodos.map((todo, index) => ({ ...todo, order: index })),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_TAGS':
      return { ...state, selectedTags: action.payload };
    default:
      return state;
  }
};

interface TodoContextType extends TodoState {
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reorderTodos: (sourceIndex: number, destinationIndex: number) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSort: (sortBy: TodoState['sortBy'], sortOrder: TodoState['sortOrder']) => void;
  setSearch: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  getFilteredTodos: () => Todo[];
  getAllTags: () => string[];
  getStats: () => { total: number; completed: number; active: number; completionRate: number };
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const todos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        dispatch({ type: 'SET_TODOS', payload: todos });
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever todos change
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      order: state.todos.length,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const reorderTodos = (sourceIndex: number, destinationIndex: number) => {
    dispatch({ type: 'REORDER_TODOS', payload: { sourceIndex, destinationIndex } });
  };

  const setFilter = (filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sortBy: TodoState['sortBy'], sortOrder: TodoState['sortOrder']) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const setSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  const setSelectedTags = (tags: string[]) => {
    dispatch({ type: 'SET_SELECTED_TAGS', payload: tags });
  };

  const getFilteredTodos = (): Todo[] => {
    let filtered = [...state.todos];

    // Apply filter
    if (state.filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    // Apply search
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query) ||
        todo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply tag filter
    if (state.selectedTags.length > 0) {
      filtered = filtered.filter(todo =>
        state.selectedTags.some(tag => todo.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (state.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) comparison = 0;
          else if (!a.dueDate) comparison = 1;
          else if (!b.dueDate) comparison = -1;
          else comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
        case 'createdAt':
        default:
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
      }

      return state.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  };

  const getAllTags = (): string[] => {
    const tags = new Set<string>();
    state.todos.forEach(todo => {
      todo.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  };

  const getStats = () => {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, active, completionRate };
  };

  const value: TodoContextType = {
    ...state,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    setFilter,
    setSort,
    setSearch,
    setSelectedTags,
    getFilteredTodos,
    getAllTags,
    getStats,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
