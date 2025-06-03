import { Layout } from '../components/layout/layout';
import { TransactionForm } from '../components/buyer/transaction-form';
import { useAuthStore } from '../store/auth-store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const CreateTransactionPage = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    
    // Redirect to seller dashboard if user is a seller
    if (user && user.role === 'seller') {
      navigate('/seller');
    }
  }, [isAuthenticated, isLoading, navigate, user]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TransactionForm />
      </div>
    </Layout>
  );
};