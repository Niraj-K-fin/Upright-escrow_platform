import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CreditCard, Truck, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Layout } from '../components/layout/layout';

export const HomePage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary-600" />,
      title: 'Secure Transactions',
      description: 'Your funds are held securely until you confirm delivery, providing protection for both buyers and sellers.'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary-600" />,
      title: 'Easy Payments',
      description: 'Simple and intuitive payment process with multiple payment options for your convenience.'
    },
    {
      icon: <Truck className="h-6 w-6 text-primary-600" />,
      title: 'Delivery Tracking',
      description: 'Track the status of your transaction from payment to delivery confirmation.'
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: 'Seller Integration',
      description: 'Sellers can easily integrate our escrow services into their existing websites or platforms.'
    }
  ];
  
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative bg-white dark:bg-gray-900 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
                >
                  <span className="block">Secure Transactions</span>
                  <span className="block text-primary-600 dark:text-primary-500">
                    For Peace of Mind
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                >
                  Upright provides a secure escrow platform that protects both buyers and sellers. We hold funds until both parties are satisfied, eliminating the risk of fraud.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                >
                  <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center lg:justify-start sm:space-x-4">
                    <Button 
                      size="lg"
                      onClick={() => navigate('/buyer')}
                    >
                      I'm a Buyer
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => navigate('/seller')}
                    >
                      I'm a Seller
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-xl"
                >
                  <div className="relative block w-full bg-gradient-to-r from-primary-700 to-primary-900 rounded-lg overflow-hidden">
                    <img
                      className="w-full opacity-60 mix-blend-overlay"
                      src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Secure Transactions"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-primary-900/40 via-primary-800/40 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <div className="text-3xl font-bold mb-2">Secure Escrow</div>
                        <div className="text-lg max-w-xs mx-auto">Protecting your transactions every step of the way</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">Features</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-4xl">
                How Upright Protects You
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
                Our escrow service provides a secure platform for both buyers and sellers.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 hover:border-primary-100 dark:hover:border-primary-900 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary-600 dark:text-primary-400 tracking-wide uppercase">Process</h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-4xl">
                How It Works
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
                Our escrow process is simple, transparent, and secure.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="relative">
                {/* Timeline line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-1 h-full bg-primary-100 dark:bg-primary-900" />
                
                {/* Timeline items */}
                <div className="space-y-16">
                  {/* Step 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="md:flex items-center md:space-x-12">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:text-right">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            1. Buyer Creates Transaction
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            The buyer initiates an escrow transaction, specifying the seller, amount, and details of the purchase.
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                          1
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="md:pl-12">
                          <img 
                            src="https://images.pexels.com/photos/6863250/pexels-photo-6863250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Creating a transaction" 
                            className="rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Step 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative"
                  >
                    <div className="md:flex items-center md:space-x-12 flex-row-reverse">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:text-left">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            2. Seller Confirms
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            The seller reviews the transaction details and confirms their willingness to proceed.
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                          2
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="md:pr-12">
                          <img 
                            src="https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Seller confirmation" 
                            className="rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Step 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="md:flex items-center md:space-x-12">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:text-right">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            3. Delivery & Confirmation
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            The seller delivers the product or service, and the buyer confirms receipt.
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="md:pl-12">
                          <img 
                            src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Delivery confirmation" 
                            className="rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Step 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="md:flex items-center md:space-x-12 flex-row-reverse">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:text-left">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            4. Funds Released
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            Once delivery is confirmed, the funds are released to the seller, completing the transaction.
                          </p>
                        </div>
                      </div>
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                          4
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <div className="md:pr-12">
                          <img 
                            src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Funds released" 
                            className="rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary-800 dark:bg-primary-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-primary-300">Sign up for free today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button 
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-50 hover:text-primary-700"
                  onClick={() => navigate('/signup')}
                >
                  Get started
                </Button>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-primary-700"
                  onClick={() => navigate('/services')}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};