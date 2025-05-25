import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import supabase from '../../lib/supabase';

const VerifyEmailPage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (session?.user) {
          // Wait a moment to ensure the verification is complete
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setError('Unable to verify email. Please try signing in.');
        }
      } catch (err) {
        console.error('Error verifying email:',  err);
        setError('Failed to verify email. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    };

    handleEmailVerification();
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center p-6">
            <div className="flex justify-center mb-4">
              {isVerifying ? (
                <MessageSquare className="h-12 w-12 text-primary-600 animate-pulse" />
              ) : error ? (
                <XCircle className="h-12 w-12 text-error-500" />
              ) : (
                <CheckCircle className="h-12 w-12 text-success-500" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isVerifying
                ? 'Verifying your email...'
                : error
                ? 'Verification Failed'
                : 'Email Verified!'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {isVerifying
                ? 'Please wait while we verify your email address.'
                : error
                ? error
                : 'Your email has been verified. Redirecting to dashboard...'}
            </p>
            
            {error && (
              <Button
                variant="primary"
                onClick={() => navigate('/signin')}
              >
                Return to Sign In
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmailPage;