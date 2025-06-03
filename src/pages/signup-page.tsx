import { Layout } from '../components/layout/layout';
import { AuthForm } from '../components/auth/auth-form';
import { UserRole } from '../types';
import { useSearchParams } from 'react-router-dom';

export const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole | null;
  
  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm mode="signup" initialRole={role || undefined} />
      </div>
    </Layout>
  );
};