export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type TransactionStatus = 
  | 'pending_confirmation' 
  | 'confirmed' 
  | 'in_delivery' 
  | 'completed' 
  | 'cancelled';

export interface Transaction {
  id: string;
  productDescription: string;
  amount: number;
  buyerId: string;
  buyerEmail: string;
  sellerId: string;
  sellerEmail: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  deliveryConfirmationDate?: string;
}

export interface CreateTransactionData {
  productDescription: string;
  amount: number;
  sellerEmail: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}