import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2, Search, MessageSquare, Trash2, MoreHorizontal, Archive } from 'lucide-react';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useTopics } from '../../hooks/useTopics';
import { Topic } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';

const TopicsPage = () => {
  const { user } = useAuth();
  const { topics, isLoading, fetchTopics, deleteTopic, updateTopic } = useTopics(user?.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchTopics();
    }
  }, [user?.id, fetchTopics]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTopics(topics);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredTopics(
        topics.filter(
          (topic) => 
            topic.title.toLowerCase().includes(query) || 
            (topic.description?.toLowerCase().includes(query) || false) ||
            (topic.category?.toLowerCase().includes(query) || false)
        )
      );
    }
  }, [topics, searchQuery]);

  const handleDeleteTopic = async (topicId: string) => {
    if (window.confirm('Are you sure you want to delete this topic? This action cannot be undone.')) {
      await deleteTopic(topicId);
    }
    setActiveDropdown(null);
  };

  const handleArchiveTopic = async (topicId: string, isArchived: boolean) => {
    await updateTopic(topicId, { isArchived: !isArchived });
    setActiveDropdown(null);
  };

  const toggleDropdown = (topicId: string) => {
    setActiveDropdown(activeDropdown === topicId ? null : topicId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">My Topics</h2>
        <Link to="/dashboard/topics/new">
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Create Topic
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="mb-6">
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
            leftIcon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
          </div>
        ) : filteredTopics.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Topic
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Responses
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTopics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/dashboard/topics/${topic.id}`} className="text-primary-600 hover:text-primary-700 font-medium">
                        {topic.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {topic.category ? (
                        <Badge variant="primary">{topic.category}</Badge>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 text-gray-400 mr-1" />
                        <span>{topic.commentCount || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(topic.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {topic.isArchived ? (
                        <Badge variant="warning">Archived</Badge>
                      ) : (
                        <Badge variant="success">Active</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(topic.id)}
                          className="inline-flex items-center p-1 border border-transparent rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                        
                        {activeDropdown === topic.id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <div className="py-1" role="menu" aria-orientation="vertical">
                              <Link
                                to={`/dashboard/topics/${topic.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                View Details
                              </Link>
                              <Link
                                to={`/t/${topic.id}`}
                                target="_blank"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                Open Public Link
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleArchiveTopic(topic.id, topic.isArchived)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                {topic.isArchived ? 'Unarchive Topic' : 'Archive Topic'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTopic(topic.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-gray-100"
                                role="menuitem"
                              >
                                Delete Topic
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<MessageSquare className="h-12 w-12" />}
            title="No topics found"
            description={
              searchQuery
                ? "We couldn't find any topics matching your search. Try a different term or clear the search."
                : "You haven't created any topics yet. Create your first topic to start collecting feedback."
            }
            actionLabel={searchQuery ? "Clear search" : "Create Topic"}
            onAction={
              searchQuery
                ? () => setSearchQuery('')
                : () => window.location.href = '/dashboard/topics/new'
            }
          />
        )}
      </div>
    </div>
  );
};

export default TopicsPage;