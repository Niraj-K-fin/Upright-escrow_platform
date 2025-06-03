import { useState } from 'react';
import { Layout } from '../components/layout/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HelpPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };
  
  const faqs = [
    {
      question: 'How does the escrow process work?',
      answer: 'Our escrow process is simple: The buyer creates a transaction and funds it. The seller confirms the transaction and delivers the product or service. The buyer then confirms delivery, and we release the funds to the seller. If there are any disputes, our team can step in to help resolve them.'
    },
    {
      question: 'What fees do you charge?',
      answer: 'Our fee structure is straightforward and transparent. For standard transactions, we charge a small percentage of the total transaction amount, typically 1-3% depending on the transaction size. For larger transactions, discounted rates may apply. All fees are clearly displayed before you complete your transaction.'
    },
    {
      question: 'How long does it take for funds to be released?',
      answer: 'Once the buyer confirms delivery, funds are released to the seller immediately. If the buyer doesn\'t confirm within 7 days of the seller marking the item as delivered, the funds are automatically released to prevent unnecessary delays.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard encryption and security measures to protect your payment information. We don\'t store complete credit card details on our servers. Our platform is regularly audited for security compliance.'
    },
    {
      question: 'What happens if there\'s a dispute?',
      answer: 'If a dispute arises, both parties can reach out to our support team. We\'ll review the transaction details, communication history, and any evidence provided by both parties. Our goal is to find a fair resolution based on the terms agreed upon at the start of the transaction.'
    },
    {
      question: 'Can I cancel a transaction?',
      answer: 'Buyers can cancel a transaction before the seller confirms it. After seller confirmation, cancellation requires mutual agreement from both parties. If you need to cancel a transaction, please contact our support team for assistance.'
    }
  ];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Find answers to common questions about our escrow service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card bordered>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Email Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our support team is available Monday-Friday, 9am-5pm EST.
              </p>
              <a 
                href="mailto:support@upright.com" 
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                support@upright.com
              </a>
            </CardContent>
          </Card>
          
          <Card bordered>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Phone Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Call us directly for urgent assistance.
              </p>
              <a 
                href="tel:+18005551234" 
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                1-800-555-1234
              </a>
            </CardContent>
          </Card>
          
          <Card bordered>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Chat with our support team in real-time.
              </p>
              <button className="text-primary-600 dark:text-primary-400 hover:underline">
                Start a Chat
              </button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index}
                className="overflow-hidden"
                bordered
              >
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="border-t border-gray-100 dark:border-gray-800 p-6">
                        <p className="text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Contact Us
          </h2>
          
          <Card bordered>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};