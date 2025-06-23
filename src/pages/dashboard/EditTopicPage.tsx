import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const editTopicSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(1000, "Description must be less than 1000 characters").optional(),
  category: z.string().min(1, "Category is required"),
  customCategory: z.string().optional(),
}).refine((data) => {
  if (data.category === "Other") {
    return data.customCategory && data.customCategory.trim().length > 0;
  }
  return true;
}, {
  message: "Custom category is required when 'Other' is selected",
  path: ["customCategory"],
});

type EditTopicFormData = z.infer<typeof editTopicSchema>;

const EditTopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const { currentTopic, fetchTopic, updateTopic } = useTopics(user?.id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditTopicFormData>({
    resolver: zodResolver(editTopicSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      customCategory: "",
    },
  });

  const selectedCategory = watch("category");

  useEffect(() => {
    if (topicId && user?.id) {
      fetchTopic(topicId);
    }
  }, [topicId, user?.id, fetchTopic]);

  useEffect(() => {
    if (currentTopic) {
      const isCustomCategory = currentTopic.category && !CATEGORIES.includes(currentTopic.category);
      
      reset({
        title: currentTopic.title,
        description: currentTopic.description || "",
        category: isCustomCategory ? "Other" : (currentTopic.category || ""),
        customCategory: isCustomCategory ? (currentTopic.category || "") : "",
      });
    }
  }, [currentTopic, reset]);

  const handleCategorySelect = (selectedCategory: string) => {
    setValue("category", selectedCategory);
    if (selectedCategory !== "Other") {
      setValue("customCategory", "");
    }
  };

  const onSubmit = async (data: EditTopicFormData) => {
    if (!topicId) return;

    try {
      setIsLoading(true);
      setError("");

      // Use custom category if 'Other' is selected
      const finalCategory = data.category === "Other" ? data.customCategory! : data.category;

      const updatedTopic = await updateTopic(topicId, {
        title: data.title.trim(),
        description: data.description?.trim() || "",
        category: finalCategory.trim(),
      });

      if (updatedTopic) {
        // Refetch the topic to ensure the state is properly updated
        await fetchTopic(topicId);
        navigate(`/dashboard/topics/${topicId}`);
      }
    } catch (err) {
      console.error('Update error:', err);
      setError(`Failed to update topic. Please try again, ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentTopic) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Edit Topic
          </h2>
          <p className="text-gray-500 mt-1">
            Update your topic details and settings.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-lg flex items-start">
            <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Input
              label="Topic Title"
              id="title"
              {...register("title")}
              placeholder="E.g., Website Redesign Feedback"
              error={errors.title?.message}
              disabled={isLoading}
            />

            <TextArea
              label="Description"
              id="description"
              {...register("description")}
              placeholder="Provide details about what kind of feedback you're looking for..."
              error={errors.description?.message}
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
                      selectedCategory === cat
                        ? "bg-primary-100 text-primary-800 border-2 border-primary-300"
                        : "bg-gray-100 text-gray-800 border-2 border-transparent hover:bg-gray-200"
                    }`}
                    disabled={isLoading}
                  >
                    {selectedCategory === cat && (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="mt-1 text-sm text-error-600">{errors.category.message}</p>
              )}

              {selectedCategory === "Other" && (
                <div className="mt-3">
                  <Input
                    label="Custom Category"
                    id="customCategory"
                    {...register("customCategory")}
                    placeholder="Enter custom category"
                    error={errors.customCategory?.message}
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/dashboard/topics/${topicId}`)}
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
                Update Topic
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditTopicPage; 