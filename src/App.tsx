import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth-store';

// Pages
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import { BuyerPage } from './pages/buyer-page';
import { SellerPage } from './pages/seller-page';
import { CreateTransactionPage } from './pages/create-transaction-page';
import { TransactionDetailPage } from './pages/transaction-detail-page';
import { ServicesPage } from './pages/services-page';
import { CompanyPage } from './pages/company-page';
import { HelpPage } from './pages/help-page';

function App() {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/help" element={<HelpPage />} />
        
        {/* Buyer Routes */}
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/buyer/new-transaction" element={<CreateTransactionPage />} />
        <Route path="/buyer/transactions/:id" element={<TransactionDetailPage />} />
        
        {/* Seller Routes */}
        <Route path="/seller" element={<SellerPage />} />
        <Route path="/seller/transactions/:id" element={<TransactionDetailPage />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;