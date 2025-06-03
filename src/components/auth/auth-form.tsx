import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Alert } from '../ui/alert';
import { useAuthStore } from '../../store/auth-store';
import { UserRole } from '../../types';
import toast from 'react-hot-toast';

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  mode: AuthMode;
  initialRole?: UserRole;
}

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  role: z.enum(['buyer', 'seller']).optional(),
});

export const AuthForm = ({ mode, initialRole }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: initialRole || 'buyer',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  
  const { login, register, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (mode === 'signup') {
        authSchema.parse(formData);
      } else {
        authSchema.pick({ email: true, password: true }).parse(formData);
      }
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
    
    if (!validateForm()) return;
    
    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
        toast.success('Login successful!');
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
        });
        toast.success('Registration successful!');
      }
      
      // Redirect based on role
      navigate(formData.role === 'buyer' ? '/buyer' : '/seller');
    } catch (error) {
      console.error('Auth error:', error);
      setApiError(error instanceof Error ? error.message : 'Authentication failed');
      toast.error('Authentication failed');
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === 'login' ? 'Log in to your account' : 'Create an account'}
        </CardTitle>
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
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                fullWidth
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              fullWidth
              required
            />
          </div>
          
          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              fullWidth
              required
            />
          </div>
          
          {mode === 'signup' && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                I am a:
              </p>
              <div className="flex gap-4">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === 'buyer'}
                    onChange={() => setFormData((prev) => ({ ...prev, role: 'buyer' }))}
                    className="sr-only"
                  />
                  <div className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                    formData.role === 'buyer' 
                      ? 'bg-primary-50 border-primary-300 dark:bg-primary-900 dark:border-primary-700'
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}>
                    <span className={`font-medium ${
                      formData.role === 'buyer' 
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      Buyer
                    </span>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === 'seller'}
                    onChange={() => setFormData((prev) => ({ ...prev, role: 'seller' }))}
                    className="sr-only"
                  />
                  <div className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                    formData.role === 'seller' 
                      ? 'bg-primary-50 border-primary-300 dark:bg-primary-900 dark:border-primary-700'
                      : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                  }`}>
                    <span className={`font-medium ${
                      formData.role === 'seller' 
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      Seller
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}
          
          <Button 
            type="submit" 
            isLoading={isLoading}
            fullWidth
            className="mt-2"
          >
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-gray-100 dark:border-gray-800 pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {mode === 'login' ? (
            <>
              Don't have an account ? signup from right above 👆🏻! 
              
            </>
          ) : (
            <>
              Already have an account? Signin from right above 👆🏻!
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};