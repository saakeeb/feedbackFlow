import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithFacebook, resetPassword } = useAuth();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await resetPassword(email);
      setShowForgotPassword(false);
    } catch (err) {
      setError('Failed to send reset password link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithFacebook();
    } catch (err) {
      setError('Failed to sign in with Facebook. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <MessageSquare className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <Card>
          {error && (
            <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {!showForgotPassword ? (
            <form className="space-y-6" onSubmit={handleSignIn}>
              <Input
                label="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />
              
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                  leftIcon={!isLoading && <LogIn className="w-4 h-4" />}
                >
                  Sign In
                </Button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleForgotPassword}>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Reset Password</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              <Input
                label="Email Address"
                type="email"
                id="reset-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowForgotPassword(false)}
                  disabled={isLoading}
                >
                  Back to Sign In
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleFacebookSignIn}
                disabled={isLoading}
              >
                Facebook
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;