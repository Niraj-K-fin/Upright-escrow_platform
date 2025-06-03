import { create } from 'zustand';
import { User, UserRole, AuthFormData } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: AuthFormData) => Promise<void>;
  register: (data: AuthFormData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// This is a mock store - in a real app, this would connect to a backend
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  login: async (data) => {
    // Simulate API request
    set({ isLoading: true });
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify credentials against a database
      // For demo purposes, we'll simulate role-based authentication
      const storedUsers = JSON.parse(localStorage.getItem('upright_users') || '[]');
      const existingUser = storedUsers.find((u: User) => u.email === data.email);
      
      if (!existingUser) {
        throw new Error('User not found');
      }
      
      // Create user session
      const user: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
        createdAt: existingUser.createdAt,
      };
      
      // Store current session
      localStorage.setItem('upright_user', JSON.stringify(user));
      
      set({ 
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      set({ isLoading: false });
      throw new Error('Login failed. Please check your credentials.');
    }
  },
  
  register: async (data) => {
    // Simulate API request
    set({ isLoading: true });
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new user
      const newUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email: data.email,
        name: data.name || data.email.split('@')[0],
        role: data.role || 'buyer',
        createdAt: new Date().toISOString(),
      };
      
      // Store user in "database"
      const storedUsers = JSON.parse(localStorage.getItem('upright_users') || '[]');
      storedUsers.push(newUser);
      localStorage.setItem('upright_users', JSON.stringify(storedUsers));
      
      // Store current session
      localStorage.setItem('upright_user', JSON.stringify(newUser));
      
      set({ 
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      set({ isLoading: false });
      throw new Error('Registration failed. Please try again.');
    }
  },
  
  logout: () => {
    localStorage.removeItem('upright_user');
    set({ 
      user: null,
      isAuthenticated: false,
    });
  },
  
  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      // Check localStorage for existing session
      const storedUser = localStorage.getItem('upright_user');
      
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({ 
          user,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));