import { Layout } from '../components/layout/layout';
import { AuthForm } from '../components/auth/auth-form';

export const LoginPage = () => {
  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm mode="login" />
      </div>
    </Layout>
  );
};