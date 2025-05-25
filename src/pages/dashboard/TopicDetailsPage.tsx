import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Share2, Edit, Archive, 
  Trash2, ExternalLink, Copy, CheckCircle, 
  AlertCircle, Loader2 
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { useTopics } from '../../hooks/useTopics';
import { useComments } from '../../hooks/useComments';
import { formatDistanceToNow, format } from 'date-fns';
import toast from 'react-hot-toast';

const TopicDetailsPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { currentTopic, fetchTopic, updateTopic, deleteTopic, isLoading: isTopicLoading } = useTopics(user?.id);
  const { comments, fetchComments, isLoading: isCommentsLoading } = useComments(topicId);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (topicId && user?.id) {
      fetchTopic(topicId);
      fetchComments(topicId);
    }
  }, [topicId, user?.id, fetchTopic, fetchComments]);

  if (!topicId) {
    return <div>Invalid topic ID</div>;
  }

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/t/${topicId}`;
    
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast.error('Failed to copy link');
      }
    );
  };

  const handleArchiveTopic = async () => {
    if (!currentTopic) return;
    
    await updateTopic(topicId, {
      isArchived: !currentTopic.isArchived
    });
    
    toast.success(
      currentTopic.isArchived 
        ? 'Topic has been unarchived!' 
        : 'Topic has been archived!'
    );
  };

  const handleDeleteTopic = async () => {
    if (confirmDelete) {
      const success = await deleteTopic(topicId);
      
      if (success) {
        navigate('/dashboard/topics');
      }
    } else {
      setConfirmDelete(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setConfirmDelete(false);
      }, 5000);
    }
  };

  if (isTopicLoading || !currentTopic) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Topic details */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>{currentTopic.title}</CardTitle>
              <div className="flex items-center mt-2 space-x-2">
                {currentTopic.category && (
                  <Badge variant="primary">{currentTopic.category}</Badge>
                )}
                {currentTopic.isArchived && (
                  <Badge variant="warning">Archived</Badge>
                )}
                <span className="text-sm text-gray-500">
                  Created {formatDistanceToNow(new Date(currentTopic.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Share2 className="w-4 h-4" />}
                onClick={handleShareLink}
              >
                {copied ? 'Copied!' : 'Share Link'}
              </Button>
              <Link to={`/t/${topicId}`} target="_blank">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<ExternalLink className="w-4 h-4" />}
                >
                  Open Public Page
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentTopic.description ? (
            <p className="text-gray-700 whitespace-pre-line">{currentTopic.description}</p>
          ) : (
            <p className="text-gray-500 italic">No description provided</p>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-600">
                {currentTopic.commentCount || 0} responses
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={() => navigate(`/dashboard/topics/${topicId}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={
                  currentTopic.isArchived ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Archive className="w-4 h-4" />
                  )
                }
                onClick={handleArchiveTopic}
              >
                {currentTopic.isArchived ? 'Unarchive' : 'Archive'}
              </Button>
              <Button
                variant="error"
                size="sm"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={handleDeleteTopic}
              >
                {confirmDelete ? 'Confirm Delete' : 'Delete'}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Share box */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Share this topic with others</h3>
              <p className="text-gray-500">
                Anyone with the link can view this topic and provide feedback
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <input
                  type="text"
                  className="input pr-10"
                  value={`${window.location.origin}/t/${topicId}`}
                  readOnly
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={handleShareLink}
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-success-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <Button 
                variant="primary"
                leftIcon={<Share2 className="w-4 h-4" />}
                onClick={handleShareLink}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments list */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback Responses</CardTitle>
        </CardHeader>
        <CardContent>
          {isCommentsLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">
                      {comment.isAnonymous ? (
                        <span className="text-gray-600">{comment.authorName} (Anonymous)</span>
                      ) : (
                        <span>{comment.authorName}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No responses yet</h3>
              <p className="text-gray-500 mb-4">
                Share your topic link to start collecting feedback
              </p>
              <Button
                variant="primary"
                leftIcon={<Share2 className="w-4 h-4" />}
                onClick={handleShareLink}
              >
                Share Link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TopicDetailsPage;