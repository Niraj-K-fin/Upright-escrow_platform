import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TruckIcon, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge, getStatusBadgeProps } from '../ui/badge';
import { Alert } from '../ui/alert';
import { useTransactionStore } from '../../store/transaction-store';
import { formatCurrency, formatDateTime, formatTimeAgo } from '../../utils/format';
import toast from 'react-hot-toast';

export const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getTransactionById,
    confirmDelivery,
    isLoading,
  } = useTransactionStore();
  
  const [isConfirming, setIsConfirming] = useState(false);
  
  if (!id) {
    navigate('/buyer');
    return null;
  }
  
  const transaction = getTransactionById(id);
  
  if (!transaction) {
    return (
      <Card>
        <CardContent className="p-8">
          <Alert variant="error" title="Transaction Not Found">
            The transaction you're looking for doesn't exist or you don't have permission to view it.
          </Alert>
          <Button 
            variant="outline" 
            className="mt-4" 
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate('/buyer')}
          >
            Back to Transactions
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  const { variant, label } = getStatusBadgeProps(transaction.status);
  
  const handleConfirmDelivery = async () => {
    try {
      setIsConfirming(true);
      await confirmDelivery(transaction.id);
      toast.success('Delivery confirmed! Payment has been released to the seller.');
    } catch (error) {
      toast.error('Failed to confirm delivery');
      console.error(error);
    } finally {
      setIsConfirming(false);
    }
  };
  
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'pending_confirmation':
        return <Clock className="h-6 w-6 text-warning-500" />;
      case 'confirmed':
      case 'in_delivery':
        return <TruckIcon className="h-6 w-6 text-primary-500" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-success-500" />;
      case 'cancelled':
        return <AlertTriangle className="h-6 w-6 text-error-500" />;
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4">
        <Button 
          variant="ghost" 
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate('/buyer')}
        >
          Back to Transactions
        </Button>
      </div>
      
      <Card bordered>
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="mb-1">
                Transaction Details
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ID: {transaction.id}
              </p>
            </div>
            <Badge variant={variant} size="lg">
              {label}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Product Information
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 mb-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                <p className="text-gray-900 dark:text-white">
                  {transaction.productDescription}
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Details</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Transaction Timeline
              </h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="rounded-full h-8 w-8 bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="h-full w-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Transaction Created
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateTime(transaction.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(transaction.createdAt)}
                    </p>
                  </div>
                </div>
                
                {transaction.status !== 'pending_confirmation' && (
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="rounded-full h-8 w-8 bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="h-full w-px bg-gray-200 dark:bg-gray-700 my-1"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Seller Confirmed
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(transaction.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}
                
                {transaction.status === 'completed' && transaction.deliveryConfirmationDate && (
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="rounded-full h-8 w-8 bg-success-100 dark:bg-success-900 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-success-600 dark:text-success-400" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Delivery Confirmed
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDateTime(transaction.deliveryConfirmationDate)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(transaction.deliveryConfirmationDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Seller Information</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Email: {transaction.sellerEmail}
                </p>
              </div>
            </div>
          </div>
          
          {(transaction.status === 'confirmed' || transaction.status === 'in_delivery') && (
            <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
              <Alert 
                variant="info" 
                title="Ready to Confirm Delivery?"
                icon={getStatusIcon()}
              >
                <p className="mb-4">
                  Once you confirm that you've received the product or service, the payment will be released to the seller.
                </p>
                <Button
                  onClick={handleConfirmDelivery}
                  isLoading={isConfirming}
                >
                  Confirm Delivery
                </Button>
              </Alert>
            </div>
          )}
          
          {transaction.status === 'completed' && (
            <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
              <Alert 
                variant="success" 
                title="Transaction Complete"
                icon={getStatusIcon()}
              >
                The delivery has been confirmed and the payment has been released to the seller.
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};