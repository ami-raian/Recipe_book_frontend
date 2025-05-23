import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe, onLike }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();

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
      await onLike(recipe._id);
    } catch (error) {
      toast.error("Failed to like recipe");
    } finally {
      setIsLiking(false);
    }
  };

  // console.log(recipe, "All recipe data");

  return (
    <div className="card card-hover bg-white dark:bg-gray-800 shadow-md overflow-hidden">
      <figure className="relative h-48">
        <img
          src={
            recipe?.image ||
            "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
          }
          alt={recipe?.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md"
        >
          <FiHeart
            className={`transition-colors ${
              isLiking ? "text-gray-400" : "text-accent hover:text-accent/80"
            }`}
            size={20}
          />
        </button>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-bold text-gray-900 dark:text-white mb-2">
          {recipe?.title}
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-outline">{recipe?.cuisineType}</span>
          <span className="badge badge-outline">
            {recipe?.preparationTime} min
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-4">
          <FiHeart className="text-accent" size={16} />
          <span>{recipe?.likeCount} likes</span>
        </div>
        <div className="card-actions">
          <Link
            to={`/recipe/${recipe._id}`}
            className="btn btn-primary btn-sm w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
