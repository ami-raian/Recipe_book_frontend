import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/recipe/RecipeForm";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const AddRecipe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (!user) {
      toast.error("You must be logged in to add a recipe");
      return;
    }

    try {
      setIsSubmitting(true);

      const newRecipe = {
        ...formData,
        likeCount: 0,
        userId: user.uid,
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      };

      const response = await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Recipe added successfully!");
      navigate("/my-recipes");
    } catch (error) {
      toast.error("Failed to add recipe");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Add New Recipe
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <RecipeForm
            onSubmit={handleSubmit}
            buttonText={isSubmitting ? "Adding Recipe..." : "Add Recipe"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
