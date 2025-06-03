import { Layout } from '../components/layout/layout';
import { ApiIntegration } from '../components/services/api-integration';

export const ServicesPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Services & Integration
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Integrate Upright Escrow into your business with our simple and secure API.
          </p>
        </div>
        
        <ApiIntegration />
      </div>
    </Layout>
  );
};