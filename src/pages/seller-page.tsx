import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/layout';
import { SellerTransactionList } from '../components/seller/seller-transaction-list';
import { useAuthStore } from '../store/auth-store';
import { useNavigate } from 'react-router-dom';

export const SellerPage = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    
    // Redirect to buyer dashboard if user is a buyer
    if (user && user.role === 'buyer') {
      navigate('/buyer');
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Seller Dashboard
          </h1>
        </div>
        
        <SellerTransactionList />
      </div>
    </Layout>
  );
};