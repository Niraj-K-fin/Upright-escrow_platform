import { create } from 'zustand';
import { Transaction, CreateTransactionData, TransactionStatus } from '../types';
import { 
  sendTransactionCreatedEmail, 
  sendTransactionConfirmedEmail,
  sendDeliveryStartedEmail,
  sendDeliveryConfirmedEmail,
} from '../services/email-service';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  createTransaction: (data: CreateTransactionData) => Promise<Transaction>;
  getTransactionsByBuyer: (buyerId: string) => Transaction[];
  getTransactionsBySeller: (sellerId: string) => Transaction[];
  getTransactionById: (id: string) => Transaction | undefined;
  updateTransactionStatus: (id: string, status: TransactionStatus) => Promise<void>;
  confirmDelivery: (id: string) => Promise<void>;
  loadTransactions: () => Promise<void>;
  simulatePayment: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  
  loadTransactions: async () => {
    set({ isLoading: true });
    
    try {
      const storedTransactions = localStorage.getItem('upright_transactions');
      
      if (storedTransactions) {
        set({ 
          transactions: JSON.parse(storedTransactions),
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
      set({ isLoading: false });
    }
  },
  
  createTransaction: async (data) => {
    set({ isLoading: true });
    
    try {
      const newTransaction: Transaction = {
        id: 'txn_' + Math.random().toString(36).substring(2, 9),
        productDescription: data.productDescription,
        amount: data.amount,
        buyerId: 'user_' + Math.random().toString(36).substring(2, 9),
        buyerEmail: localStorage.getItem('upright_user') ? JSON.parse(localStorage.getItem('upright_user')!).email : 'buyer@example.com',
        sellerId: 'user_' + Math.random().toString(36).substring(2, 9),
        sellerEmail: data.sellerEmail,
        status: 'pending_confirmation',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Save transaction first
      const updatedTransactions = [...get().transactions, newTransaction];
      localStorage.setItem('upright_transactions', JSON.stringify(updatedTransactions));
      set({ transactions: updatedTransactions });
      
      // Try to send emails, but don't block transaction creation if it fails
      try {
        await sendTransactionCreatedEmail(newTransaction);
      } catch (emailError) {
        console.error('Failed to send notification emails:', emailError);
        // Continue execution - email failure shouldn't prevent transaction creation
      }
      
      set({ isLoading: false });
      return newTransaction;
    } catch (error) {
      console.error('Failed to create transaction:', error);
      set({ isLoading: false });
      throw new Error('Transaction creation failed. Please try again.');
    }
  },
  
  getTransactionsByBuyer: (buyerId) => {
    return get().transactions.filter(t => 
      t.buyerId === buyerId || 
      t.buyerEmail === (localStorage.getItem('upright_user') ? JSON.parse(localStorage.getItem('upright_user')!).email : '')
    );
  },
  
  getTransactionsBySeller: (sellerId) => {
    return get().transactions.filter(t => 
      t.sellerId === sellerId || 
      t.sellerEmail === (localStorage.getItem('upright_user') ? JSON.parse(localStorage.getItem('upright_user')!).email : '')
    );
  },
  
  getTransactionById: (id) => {
    return get().transactions.find(t => t.id === id);
  },
  
  updateTransactionStatus: async (id, status) => {
    set({ isLoading: true });
    
    try {
      const transaction = get().transactions.find(t => t.id === id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      const updatedTransactions = get().transactions.map(t => {
        if (t.id === id) {
          const updatedTransaction = {
            ...t,
            status,
            updatedAt: new Date().toISOString(),
            ...(status === 'completed' ? { deliveryConfirmationDate: new Date().toISOString() } : {})
          };
          return updatedTransaction;
        }
        return t;
      });
      
      // Update transaction status first
      localStorage.setItem('upright_transactions', JSON.stringify(updatedTransactions));
      set({ transactions: updatedTransactions });
      
      // Try to send emails, but don't block status update if it fails
      try {
        if (status === 'confirmed') {
          await sendTransactionConfirmedEmail(transaction);
        } else if (status === 'in_delivery') {
          await sendDeliveryStartedEmail(transaction);
        }
      } catch (emailError) {
        console.error('Failed to send status update emails:', emailError);
        // Continue execution - email failure shouldn't prevent status update
      }
      
      set({ isLoading: false });
    } catch (error) {
      console.error('Failed to update transaction:', error);
      set({ isLoading: false });
      throw new Error('Failed to update transaction status. Please try again.');
    }
  },
  
  confirmDelivery: async (id) => {
    try {
      const transaction = get().transactions.find(t => t.id === id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      await get().updateTransactionStatus(id, 'completed');
      
      // Try to send confirmation emails, but don't block completion if it fails
      try {
        await sendDeliveryConfirmedEmail(transaction);
      } catch (emailError) {
        console.error('Failed to send delivery confirmation emails:', emailError);
        // Continue execution - email failure shouldn't prevent delivery confirmation
      }
    } catch (error) {
      console.error('Failed to confirm delivery:', error);
      throw new Error('Failed to confirm delivery. Please try again.');
    }
  },
  
  simulatePayment: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1500));
    set({ isLoading: false });
    return Promise.resolve();
  }
}));