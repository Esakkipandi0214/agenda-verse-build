import axios from 'axios';
interface Todo {
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
}// or wherever your interface is

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/todos`;

export const addTodoFromApi = async (
  todoInput: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>,userId:string,
  token: string
): Promise<Todo | null> => {
  try {
    const response = await axios.post(API_URL, {userId,...todoInput}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const createdTodo = response.data;

    // Convert _id to id and fix date types
    const formatted: Todo = {
      ...createdTodo,
      id: createdTodo._id,
      createdAt: new Date(createdTodo.createdAt),
      updatedAt: new Date(createdTodo.updatedAt),
    };

    return formatted;
  } catch (error) {
    console.error('Failed to create todo:', error);
    return null;
  }
};


export const toggleTodoStatusFromApi = async (
  id: string,
  token: string
): Promise<Todo | null> => {
  try {
    const response = await axios.put(`${API_URL}/status/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updated = response.data;

    const formatted: Todo = {
      ...updated,
      id: updated._id,
      createdAt: new Date(updated.createdAt),
      updatedAt: new Date(updated.updatedAt),
    };

    return formatted;
  } catch (error) {
    console.error('Failed to toggle todo status:', error);
    return null;
  }
};


export const deleteTodoFromApi = async (
  id: string,
  token: string
): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error('Failed to delete todo:', error);
    return false;
  }
};

export const updateTodoFromApi = async (
  id: string,
  updates: Partial<Todo>,
  token: string
): Promise<Todo | null> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updated = response.data;

    const formatted: Todo = {
      ...updated,
      id: updated._id,
      createdAt: new Date(updated.createdAt),
      updatedAt: new Date(updated.updatedAt),
    };

    return formatted;
  } catch (error) {
    console.error('Failed to update todo:', error);
    return null;
  }
};
