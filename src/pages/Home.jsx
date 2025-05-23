import { useState, useEffect } from "react";
import Banner from "../components/home/Banner";
import FeaturedRecipes from "../components/home/FeaturedRecipes";
import Categories from "../components/home/Categories";
import CommunitySection from "../components/home/CommunitySection";
import toast from "react-hot-toast";

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();

        // Sort recipes by likeCount and take the top 6
        const topRecipes = data
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, 6);

        setFeaturedRecipes(topRecipes);
      } catch (error) {
        console.error(error);
        toast.error("Could not load recipes");
      }
    };

    fetchRecipes();
  }, []);

  const handleLike = async (recipeId) => {
    try {
      // Increment like count locally
      setFeaturedRecipes((prev) =>
        prev
          .map((recipe) =>
            recipe._id === recipeId
              ? { ...recipe, likeCount: recipe.likeCount + 1 }
              : recipe
          )
          .sort((a, b) => b.likeCount - a.likeCount)
      );

      toast.success("Recipe liked!");
      // Optional: send like update to backend here
    } catch (error) {
      toast.error("Failed to like recipe");
    }
  };

  return (
    <div>
      <Banner />
      <FeaturedRecipes recipes={featuredRecipes} onLike={handleLike} />
      <Categories />
      <CommunitySection />
    </div>
  );
};

export default Home;
