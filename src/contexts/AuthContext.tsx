
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return initialState;
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
  dispatch({ type: 'AUTH_START' });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/userActions/login`, {
      email,
      password,
    });

    const { user, token } = response.data;

    // Store token and user in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({ type: 'AUTH_SUCCESS', payload: user });
      toast.success(`Welcome back, ${user.name || 'User'}!`);
  } catch (error: any) {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Login failed';

    dispatch({ type: 'AUTH_ERROR', payload: message });
     toast.warning('Login Failed', {
  description: message,
});
  }
};


  const register = async (name: string, email: string, password: string) => {
  dispatch({ type: 'AUTH_START' });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/userActions`, {
      name,
      email,
      password
    });

    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({ type: 'AUTH_SUCCESS', payload: user });

    // Optional: Set token for future API calls
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // ✅ Success toast
    toast.success('Registration ',{description:'Account created successfully!'});
  } catch (error: any) {
     const backendMessage = error.response?.data?.error;
    let friendlyMessage = 'Registration failed. Please try again.';

    // ✅ Handle specific backend messages
    if (backendMessage === 'All fields are required.') {
      friendlyMessage = 'Please fill in all required fields.';
    } else if (backendMessage === 'This email is already registered. Please login.') {
      friendlyMessage = 'That email is already in use. Try logging in instead.';
    } else if (backendMessage === 'Please enter a valid email address.') {
      friendlyMessage = 'Enter a valid email address.';
    } else if (backendMessage === 'Password must be at least 6 characters long.') {
      friendlyMessage = 'Password must be at least 6 characters.';
    } else if (backendMessage) {
      friendlyMessage = backendMessage;
    }

    dispatch({ type: 'AUTH_ERROR', payload: friendlyMessage });

    // ❌ Error toast
    toast.error( 'Registration Failed', {
  description: friendlyMessage,
} );
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.error(`Logged out Successfully !`);
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
