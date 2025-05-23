import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import RecipeForm from "../components/recipe/RecipeForm";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const MyRecipes = () => {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(user, "User data");
  console.log(myRecipes, "My recipes data");

  useEffect(() => {
    if (!user) return;

    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        const userRecipes = data.filter((recipe) => recipe.userId === user.uid);
        setMyRecipes(userRecipes);
      } catch (error) {
        console.error(error);
        toast.error("Could not load recipes");
      }
    };

    fetchRecipes();
  }, [user]);

  const handleUpdate = async (formData) => {
    if (!currentRecipe) return;

    try {
      setIsSubmitting(true);

      // In a real app, this would be an API call to update the recipe
      // For now, we'll just simulate a delay and update the state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedRecipes = myRecipes.map((recipe) =>
        recipe._id === currentRecipe._id ? { ...recipe, ...formData } : recipe
      );

      setMyRecipes(updatedRecipes);
      toast.success("Recipe updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update recipe");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      // In a real app, this would be an API call to delete the recipe
      // For now, we'll just simulate a delay and update the state
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedRecipes = myRecipes.filter(
        (recipe) => recipe.id !== recipeId
      );
      setMyRecipes(updatedRecipes);
      toast.success("Recipe deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete recipe");
    }
  };

  const openEditModal = (recipe) => {
    setCurrentRecipe(recipe);
    setIsEditModalOpen(true);
  };

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Recipes
        </h1>

        {myRecipes.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't added any recipes yet.
            </p>
            <a href="/add-recipe" className="btn btn-primary">
              Add Your First Recipe
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {myRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={
                        recipe.image ||
                        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
                      }
                      alt={recipe.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {recipe.title}
                      </h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(recipe)}
                          className="btn btn-sm btn-circle btn-ghost"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="btn btn-sm btn-circle btn-ghost text-error"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="badge badge-outline">
                        {recipe.cuisineType}
                      </span>
                      <span className="badge badge-outline">
                        {recipe.preparationTime} min
                      </span>
                      <span className="badge badge-outline">
                        {recipe.likeCount} likes
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Ingredients
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                          {recipe.ingredients
                            .slice(0, 5)
                            .map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          {recipe.ingredients.length > 5 && (
                            <li>...and {recipe.ingredients.length - 5} more</li>
                          )}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Instructions
                        </h3>
                        <ul className="list-decimal list-inside text-gray-700 dark:text-gray-300">
                          {recipe.instructions
                            .slice(0, 3)
                            .map((instruction, index) => (
                              <li key={index} className="truncate">
                                {instruction}
                              </li>
                            ))}
                          {recipe.instructions.length > 3 && (
                            <li>
                              ...and {recipe.instructions.length - 3} more steps
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recipe.categories.map((category) => (
                          <span
                            key={category}
                            className="badge badge-primary badge-outline"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && currentRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Recipe
                  </h2>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="btn btn-sm btn-circle btn-ghost"
                  >
                    ×
                  </button>
                </div>

                <RecipeForm
                  initialData={currentRecipe}
                  onSubmit={handleUpdate}
                  buttonText={
                    isSubmitting ? "Updating Recipe..." : "Update Recipe"
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
