import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, MessageSquare, Users, TrendingUp, 
  Plus, ChevronRight, Loader2 
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useTopics } from '../../hooks/useTopics';
import { Topic } from '../../types';
import { formatDistanceToNow } from 'date-fns';

const DashboardPage = () => {
  const { user } = useAuth();
  const { topics, isLoading, fetchTopics } = useTopics(user?.id);
  const [recentTopics, setRecentTopics] = useState<Topic[]>([]);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetchTopics();
    }
  }, [user?.id, fetchTopics]);

  useEffect(() => {
    // Get the 5 most recent topics
    setRecentTopics(topics.slice(0, 5));
    
    // Calculate total comments
    const commentsCount = topics.reduce((sum, topic) => sum + (topic.commentCount || 0), 0);
    setTotalComments(commentsCount);
  }, [topics]);

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-white rounded-lg p-6 shadow-card">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.fullName || user?.email?.split('@')[0]}!
        </h2>
        <p className="mt-1 text-gray-500">
          Here's an overview of your feedback collection activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Topics</h3>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-gray-400 animate-spin mt-1" />
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">{topics.length}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600">
                <BarChart2 className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Feedback</h3>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-gray-400 animate-spin mt-1" />
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">{totalComments}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-50 text-success-500">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Avg. Responses</h3>
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-gray-400 animate-spin mt-1" />
                ) : (
                  <p className="text-2xl font-semibold text-gray-900">
                    {topics.length > 0 
                      ? (totalComments / topics.length).toFixed(1) 
                      : '0'}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent topics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Topics</CardTitle>
            <Link to="/dashboard/topics">
              <Button variant="secondary" size="sm">
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
            </div>
          ) : recentTopics.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {recentTopics.map((topic) => (
                <Link 
                  key={topic.id}
                  to={`/dashboard/topics/${topic.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="py-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{topic.title}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
                        <span>{formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}</span>
                        <span>•</span>
                        <span>{topic.commentCount || 0} responses</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-gray-500 mb-4">You haven't created any topics yet.</p>
              <Link to="/dashboard/topics/new">
                <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                  Create Topic
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mb-4">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Create a New Topic</h3>
            <p className="text-gray-500 mb-4">Create a new topic to collect feedback on a specific feature, idea, or product.</p>
            <Link to="/dashboard/topics/new">
              <Button variant="primary">Get Started</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Share with Your Team</h3>
            <p className="text-gray-500 mb-4">Share your feedback topics with team members to collaborate on improvements.</p>
            <Button variant="secondary">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;