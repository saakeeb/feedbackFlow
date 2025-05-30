import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, X } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import { useAuth } from "../../hooks/useAuth";
import { useTopics } from "../../hooks/useTopics";

const CATEGORIES = [
  "General Meeting",
  "General Feedback",
  "Feature Request",
  "Bug Report",
  "Product Feedback",
  "User Experience",
  "Client Feedback",
  "Customer Service",
  "Documentation",
  "Other",
];

const CreateTopicPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const { createTopic } = useTopics(user?.id);
  const navigate = useNavigate();

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    if (selectedCategory !== "Other") {
      setCustomCategory("");
    }
  };

  const handleCreateTopic = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Use custom category if 'Other' is selected
      const finalCategory = category === "Other" ? customCategory : category;

      const newTopic = await createTopic({
        title: title.trim(),
        description: description.trim(),
        category: finalCategory.trim(),
      });

      if (newTopic) {
        navigate(`/dashboard/topics/${newTopic.id}`);
      }
    } catch (err) {
      setError(`Failed to create topic. Please try again, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create a New Topic
          </h2>
          <p className="text-gray-500 mt-1">
            Create a topic to collect feedback from your users.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-lg flex items-start">
            <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCreateTopic}>
          <div className="space-y-6">
            <Input
              label="Topic Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Website Redesign Feedback"
              required
              disabled={isLoading}
            />

            <TextArea
              label="Description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about what kind of feedback you're looking for..."
              disabled={isLoading}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      category === cat
                        ? "bg-primary-100 text-primary-800 border-2 border-primary-300"
                        : "bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-gray-200"
                    }`}
                    disabled={isLoading}
                  >
                    {category === cat && (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    )}
                    {cat}
                  </button>
                ))}
              </div>

              {category === "Other" && (
                <div className="mt-3">
                  <Input
                    label="Custom Category"
                    id="customCategory"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/dashboard/topics")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Create Topic
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateTopicPage;
