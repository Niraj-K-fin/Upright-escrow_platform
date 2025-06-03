import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge, getStatusBadgeProps } from '../ui/badge';
import { Button } from '../ui/button';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useTransactionStore } from '../../store/transaction-store';
import { useAuthStore } from '../../store/auth-store';
import { formatCurrency, formatDateShort, formatTimeAgo } from '../../utils/format';
import { PlusCircle } from 'lucide-react';
import { Transaction } from '../../types';

export const TransactionList = () => {
  const { user } = useAuthStore();
  const { 
    transactions,
    getTransactionsByBuyer,
    loadTransactions,
    isLoading 
  } = useTransactionStore();
  
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);
  
  const buyerTransactions = user 
    ? getTransactionsByBuyer(user.id)
    : [];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (buyerTransactions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No transactions yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Start by creating your first escrow transaction to securely purchase goods or services.
            </p>
          </div>
          
          <Link to="/buyer/new-transaction">
            <Button leftIcon={<PlusCircle className="h-5 w-5" />}>
              Create Transaction
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Transactions
        </h2>
        
        <Link to="/buyer/new-transaction">
          <Button size="sm" leftIcon={<PlusCircle className="h-4 w-4" />}>
            New Transaction
          </Button>
        </Link>
      </div>
      
      {buyerTransactions.map((transaction: Transaction) => {
        const { variant, label } = getStatusBadgeProps(transaction.status);
        
        return (
          <Link 
            key={transaction.id} 
            to={`/buyer/transactions/${transaction.id}`}
          >
            <Card 
              className="hover:border-primary-300 dark:hover:border-primary-700 transition-colors" 
              hover 
              bordered
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {transaction.productDescription}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateShort(transaction.createdAt)} · {formatTimeAgo(transaction.createdAt)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <Badge variant={variant} className="mt-1">
                      {label}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};