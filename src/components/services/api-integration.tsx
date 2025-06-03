import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Alert } from '../ui/alert';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const ApiIntegration = () => {
  const apiEndpointUrl = 'https://api.upright.com/v1/transactions';
  
  const redirectExample = `
// Redirect buyer to Upright Escrow
function redirectToEscrow(sellerEmail, amount, productDescription) {
  const params = new URLSearchParams({
    sellerEmail,
    amount,
    productDescription
  });
  
  window.location.href = "https://upright.escrow.com/buyer/new-transaction?" + params.toString();
}

// Usage example
document.getElementById("escrowButton").addEventListener("click", () => {
  redirectToEscrow(
    "your-seller-email@example.com",
    99.99,
    "Premium Product XYZ"
  );
});
`;

  const apiExample = `
// Example: Create a new escrow transaction
async function createEscrowTransaction(apiKey, transactionData) {
  const response = await fetch('${apiEndpointUrl}', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${apiKey}\`
    },
    body: JSON.stringify(transactionData)
  });
  
  return response.json();
}

// Usage example
const transaction = await createEscrowTransaction('YOUR_API_KEY', {
  productDescription: 'Premium Product XYZ',
  amount: 99.99,
  buyerEmail: 'buyer@example.com',
  sellerEmail: 'seller@example.com'
});
`;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>API Integration Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Integrate Upright Escrow's secure payment system into your website or application using our simple API. There are two main ways to integrate:
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Option 1: Redirect Flow
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The simplest integration option is to redirect your buyers to Upright Escrow with pre-filled transaction details.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden">
                <SyntaxHighlighter language="javascript" style={docco}>
                  {redirectExample}
                </SyntaxHighlighter>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Option 2: API Integration
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For a more seamless experience, use our API to create and manage escrow transactions directly from your application.
              </p>
              
              <Alert 
                variant="info" 
                className="mb-4"
              >
                To use the API, you'll need to sign up for a seller account and generate an API key in your dashboard.
              </Alert>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden">
                <SyntaxHighlighter language="javascript" style={docco}>
                  {apiExample}
                </SyntaxHighlighter>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Available Endpoints
              </h3>
              
              <div className="border dark:border-gray-700 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Endpoint</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">/transactions</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">POST</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Create a new escrow transaction</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">/transactions</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">GET</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">List all transactions</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">/transactions/:id</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">GET</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Get transaction details</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">/transactions/:id/status</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">PUT</td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Update transaction status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};