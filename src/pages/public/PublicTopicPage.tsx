import { useEffect, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, Send, User, AlertCircle, Loader2 } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import { useAuth } from '../../hooks/useAuth';
import { useTopics } from '../../hooks/useTopics';
import { useComments } from '../../hooks/useComments';
import { format } from 'date-fns';

const PublicTopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { user, isAuthenticated } = useAuth();
  const { currentTopic, fetchTopic, isLoading: isTopicLoading } = useTopics();
  const { comments, fetchComments, addComment, isLoading: isCommentsLoading } = useComments(topicId);
  
  const [commentContent, setCommentContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (topicId) {
      fetchTopic(topicId);
      fetchComments(topicId);
    }
  }, [topicId, fetchTopic, fetchComments]);

  useEffect(() => {
    // Prefill author name for authenticated users
    if (isAuthenticated && user) {
      setAuthorName(user.fullName || user.email.split('@')[0]);
      setIsAnonymous(false);
    }
  }, [isAuthenticated, user]);

  if (!topicId) {
    return <div>Invalid topic ID</div>;
  }

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      setError('Please enter your feedback');
      return;
    }
    
    if (!isAnonymous && !authorName.trim()) {
      setError("Please enter your name");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await addComment(
        commentContent.trim(),
        isAnonymous ? "Anonymous" : authorName.trim(),
        isAnonymous
      );

      // Reset form
      setCommentContent("");

      // Don't reset author name for authenticated users
      if (!isAuthenticated && !isAnonymous) {
        setAuthorName("");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to submit feedback. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isTopicLoading || !currentTopic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  // Check if topic is archived
  if (currentTopic.isArchived) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center">
                <MessageSquare className="h-12 w-12 text-primary-500" />
              </div>
              <CardTitle className="text-center mt-4">{currentTopic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-warning-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  This topic has been archived
                </h3>
                <p className="text-gray-500 mb-4">
                  The owner has archived this topic and is no longer accepting feedback.
                </p>
                <Link to="/">
                  <Button variant="primary">
                    Go Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <MessageSquare className="h-12 w-12 text-primary-500" />
            </div>
            <CardTitle className="text-center mt-4">
              {currentTopic.title}
            </CardTitle>
            {currentTopic.description && (
              <p className="mt-2 text-center text-gray-600">
                {currentTopic.description}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Share Your Feedback
              </h3>

              {error && (
                <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitComment}>
                <div className="space-y-4">
                  <TextArea
                    label="Your Feedback"
                    id="comment"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Share your thoughts, ideas, or suggestions..."
                    required
                    disabled={isSubmitting}
                  />

                  {!isAuthenticated && !isAnonymous && (
                    <Input
                      label="Your Name"
                      id="authorName"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      disabled={isSubmitting}
                    />
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      disabled={isSubmitting}
                    />
                    <label
                      htmlFor="anonymous"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Submit anonymously
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      rightIcon={!isSubmitting && <Send className="w-4 h-4" />}
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Previous Feedback ({comments.length})
              </h3>

              {isCommentsLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center font-medium">
                          {comment.isAnonymous ? (
                            <>
                              <User className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-gray-600">Anonymous</span>
                            </>
                          ) : (
                            <>
                              <User className="h-4 w-4 text-primary-500 mr-2" />
                              <span>{comment.authorName}</span>
                            </>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {format(
                            new Date(comment.createdAt),
                            "MMM d, yyyy • h:mm a"
                          )}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No feedback yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicTopicPage;