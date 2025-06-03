import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { TransactionDetail } from '../components/buyer/transaction-detail';
import { SellerTransactionDetail } from '../components/seller/seller-transaction-detail';
import { useAuthStore } from '../store/auth-store';

export const TransactionDetailPage = () => {
  const { user } = useAuthStore();
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {user?.role === 'buyer' ? (
          <TransactionDetail />
        ) : (
          <SellerTransactionDetail />
        )}
      </div>
    </Layout>
  );
};