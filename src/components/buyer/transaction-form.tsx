import { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Alert } from '../ui/alert';
import { useTransactionStore } from '../../store/transaction-store';
import toast from 'react-hot-toast';

const transactionSchema = z.object({
  productDescription: z.string().min(5, 'Description must be at least 5 characters'),
  amount: z.preprocess(
    (val) => (val === '' ? 0 : Number(val)),
    z.number().positive('Amount must be positive')
  ),
  sellerEmail: z.string().email('Please enter a valid email address'),
});

export const TransactionForm = () => {
  const [formData, setFormData] = useState({
    productDescription: '',
    amount: '',
    sellerEmail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [apiError, setApiError] = useState<string | null>(null);
  
  const { createTransaction, simulatePayment, isLoading } = useTransactionStore();
  const navigate = useNavigate();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    try {
      transactionSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    if (step === 'details') {
      if (!validateForm()) return;
      setStep('payment');
      return;
    }
    
    if (step === 'payment') {
      try {
        // Simulate payment processing
        await simulatePayment();
        
        // Move to confirmation
        setStep('confirmation');
      } catch (error) {
        console.error('Payment error:', error);
        setApiError(error instanceof Error ? error.message : 'Payment processing failed');
        toast.error('Payment processing failed');
      }
    }
    
    if (step === 'confirmation') {
      try {
        // Create the transaction
        const transaction = await createTransaction({
          productDescription: formData.productDescription,
          amount: Number(formData.amount),
          sellerEmail: formData.sellerEmail,
        });
        
        toast.success('Transaction created successfully!');
        navigate(`/buyer/transactions/${transaction.id}`);
      } catch (error) {
        console.error('Transaction error:', error);
        setApiError(error instanceof Error ? error.message : 'Transaction creation failed');
        toast.error('Transaction creation failed');
      }
    }
  };
  
  const renderDetailsStep = () => (
    <>
      <div className="mb-4">
        <Textarea
          label="Product or Service Description"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          error={errors.productDescription}
          placeholder="Describe what you're purchasing"
          rows={4}
          fullWidth
          required
        />
      </div>
      
      <div className="mb-4">
        <Input
          label="Amount (USD)"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          error={errors.amount}
          placeholder="0.00"
          fullWidth
          required
        />
      </div>
      
      <div className="mb-4">
        <Input
          label="Seller Email"
          type="email"
          name="sellerEmail"
          value={formData.sellerEmail}
          onChange={handleChange}
          error={errors.sellerEmail}
          placeholder="seller@example.com"
          fullWidth
          required
        />
      </div>
    </>
  );
  
  const renderPaymentStep = () => (
    <>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Please enter your payment details below to secure the funds in escrow.
      </p>
      
      <div className="mb-4">
        <Input
          label="Card Number"
          name="cardNumber"
          placeholder="4242 4242 4242 4242"
          fullWidth
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          label="Expiry Date"
          name="expiryDate"
          placeholder="MM/YY"
          fullWidth
          required
        />
        <Input
          label="CVC"
          name="cvc"
          placeholder="123"
          fullWidth
          required
        />
      </div>
      
      <div className="mb-4">
        <Input
          label="Cardholder Name"
          name="cardholderName"
          placeholder="John Smith"
          fullWidth
          required
        />
      </div>
      
      <div className="mb-4">
        <Alert variant="info">
          This is a safe payment method . Your payment will be processed safely, We don't  save your card details.
        </Alert>
      </div>
    </>
  );
  
  const renderConfirmationStep = () => (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Summary</h4>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <p className="text-gray-500 dark:text-gray-400">Description:</p>
          <p className="col-span-2 text-gray-900 dark:text-gray-100">{formData.productDescription}</p>
          
          <p className="text-gray-500 dark:text-gray-400">Amount:</p>
          <p className="col-span-2 text-gray-900 dark:text-gray-100">
            ${parseFloat(formData.amount).toFixed(2)}
          </p>
          
          <p className="text-gray-500 dark:text-gray-400">Seller:</p>
          <p className="col-span-2 text-gray-900 dark:text-gray-100">{formData.sellerEmail}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <Alert variant="success" title="Payment Successful">
          Your payment has been processed successfully. Confirm to create this transaction and notify the seller.
        </Alert>
      </div>
    </>
  );
  
  const getStepButton = () => {
    switch (step) {
      case 'details':
        return 'Continue to Payment';
      case 'payment':
        return 'Process Payment';
      case 'confirmation':
        return 'Create Transaction';
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Escrow Transaction</CardTitle>
      </CardHeader>
      
      <CardContent>
        {apiError && (
          <Alert 
            variant="error" 
            className="mb-4"
          >
            {apiError}
          </Alert>
        )}
        
        <div className="mb-6">
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'details' || step === 'payment' || step === 'confirmation'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  1
                </div>
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">Details</span>
              </div>
              
              <div className={`h-1 flex-1 mx-2 ${
                step === 'payment' || step === 'confirmation'
                  ? 'bg-primary-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`} />
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'payment' || step === 'confirmation'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  2
                </div>
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">Payment</span>
              </div>
              
              <div className={`h-1 flex-1 mx-2 ${
                step === 'confirmation'
                  ? 'bg-primary-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`} />
              
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'confirmation'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  3
                </div>
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">Confirm</span>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 'details' && renderDetailsStep()}
          {step === 'payment' && renderPaymentStep()}
          {step === 'confirmation' && renderConfirmationStep()}
          
          <div className="flex justify-between mt-6">
            {step !== 'details' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step === 'confirmation' ? 'payment' : 'details')}
              >
                Back
              </Button>
            )}
            
            <Button
              type="submit"
              isLoading={isLoading}
              className={step === 'details' ? 'ml-auto' : ''}
            >
              {getStepButton()}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};