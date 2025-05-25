import { Link } from 'react-router-dom';
import { MessageSquare, Share2, UserPlus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-16 sm:py-24 lg:py-32">
            <div className="relative">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Collect feedback that actually matters
              </h1>
              <p className="mt-6 text-xl text-primary-100 max-w-3xl">
                Create topics, share links, and collect valuable feedback from your users, 
                customers, and team members in one centralized platform.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="shadow-md"
                  >
                    {isAuthenticated ? "Go to Dashboard" : "Get Started for Free"}
                  </Button>
                </Link>
                <Link to="/features">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
                  >
                    See how it works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -mt-16 opacity-10">
          <MessageSquare className="w-96 h-96 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 -mb-16 opacity-10">
          <MessageSquare className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to collect feedback
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Simple yet powerful tools to help you gather, organize, and act on feedback.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg shadow-card px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Create Topics</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Create customized topics to collect specific feedback from your users or team members.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg shadow-card px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <Share2 className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Share Links</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Generate shareable links to easily distribute to your audience and collect their feedback.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg shadow-card px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        <UserPlus className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Anonymous Feedback</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Allow users to provide feedback anonymously, encouraging honest and open communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-center">
              Trusted by teams around the world
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center items-center">
              <div className="h-12 text-gray-400">Company 1</div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="h-12 text-gray-400">Company 2</div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="h-12 text-gray-400">Company 3</div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="h-12 text-gray-400">Company 4</div>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <div className="h-12 text-gray-400">Company 5</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start collecting feedback?</span>
            <span className="block text-primary-300">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                <Button
                  variant="secondary"
                  size="lg"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;