import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/recipe/RecipeForm";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import dummyRecipes from "../data/dummyRecipes";

const AddRecipe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    if (!user) {
      toast.error("You must be logged in to add a recipe");
      return;
    }

    console.log(formData);

    try {
      setIsSubmitting(true);

      // In a real app, this would be an API call to save the recipe
      // For now, we'll just simulate a delay and show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a new recipe object
      const newRecipe = {
        id: dummyRecipes.length + 1,
        ...formData,
        likeCount: 0,
        userId: user.uid,
        user: {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      };

      // In a real app, we would add this to the database
      // For this demo, we'll just log it
      console.log("New recipe created:", newRecipe);

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
