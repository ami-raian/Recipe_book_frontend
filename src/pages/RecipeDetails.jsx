import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiHeart, FiClock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import Loading from "../components/ui/Loading";

const RecipeDetails = () => {
  const { _id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://recipe-book-back-end-alpha.vercel.app/recipes/${_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch recipe");
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        toast.error("Error loading recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [_id]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like recipes");
      return;
    }

    if (recipe.userId === user.uid) {
      toast.error("You can't like your own recipe");
      return;
    }

    try {
      setIsLiking(true);
      setRecipe((prev) => ({ ...prev, likeCount: prev.likeCount + 1 }));
      toast.success("Recipe liked!");
    } catch (error) {
      toast.error("Failed to like recipe");
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) return <Loading />;

  if (!recipe) {
    return (
      <div className="py-10">
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Recipe Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The recipe you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/all-recipes" className="btn btn-primary">
            Browse All Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container max-w-5xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img
              src={
                recipe.image ||
                "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
              }
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="badge badge-primary">
                  {recipe.cuisineType}
                </span>
                {recipe.categories.map((category) => (
                  <span
                    key={category}
                    className="badge badge-outline text-white"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {recipe.title}
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <FiUser className="text-primary" size={18} />
                  <span className="text-gray-700 dark:text-gray-300">
                    {recipe.user?.displayName || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="text-primary" size={18} />
                  <span className="text-gray-700 dark:text-gray-300">
                    {recipe.preparationTime} min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiHeart className="text-accent" size={18} />
                  <span className="text-gray-700 dark:text-gray-300">
                    {recipe.likeCount}{" "}
                    {recipe.likeCount === 1 ? "person is" : "people are"}{" "}
                    interested in this recipe
                  </span>
                </div>
              </div>

              <button
                onClick={handleLike}
                disabled={isLiking || recipe.userId === user?.uid}
                className={`btn ${
                  recipe.userId === user?.uid ? "btn-disabled" : "btn-primary"
                }`}
              >
                {isLiking ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FiHeart size={18} />
                    Like
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full text-white flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <p>{instruction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About this Recipe
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                This {recipe.cuisineType} dish takes approximately{" "}
                {recipe.preparationTime} minutes to prepare and is perfect for{" "}
                {recipe.categories.join(", ")}. With {recipe.ingredients.length}{" "}
                ingredients and {recipe.instructions.length} easy-to-follow
                steps, it's a {recipe.likeCount > 100 ? "popular" : "delicious"}{" "}
                choice for your next meal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
