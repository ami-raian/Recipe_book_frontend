import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../components/recipe/RecipeList";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const cuisineTypes = [
  "All",
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "American",
  "Thai",
  "Japanese",
  "French",
  "Mediterranean",
  "Others",
];

const AllRecipes = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categoryParam = searchParams.get("category");

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://recipe-book-back-end-alpha.vercel.app/recipes`
        );
        const data = await response.json();
        setRecipes(data);

        if (categoryParam) {
          const filtered = data.filter((recipe) =>
            recipe.categories.includes(categoryParam)
          );
          setFilteredRecipes(filtered);
        } else {
          setFilteredRecipes(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        toast.error("Failed to load recipes");
      }
    };

    fetchRecipes();
  }, [categoryParam]);

  // Re-filter on cuisine or searchTerm change
  useEffect(() => {
    let result = [...recipes];

    if (selectedCuisine !== "All") {
      result = result.filter(
        (recipe) => recipe.cuisineType === selectedCuisine
      );
    }

    if (categoryParam) {
      result = result.filter((recipe) =>
        recipe.categories.includes(categoryParam)
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.cuisineType.toLowerCase().includes(term) ||
          recipe.categories.some((cat) => cat.toLowerCase().includes(term))
      );
    }

    setFilteredRecipes(result);
  }, [selectedCuisine, searchTerm, recipes, categoryParam]);

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleLike = async (recipeId) => {
    try {
      // This demo only updates the UI (not real DB update)
      setRecipes((prev) =>
        prev.map((r) =>
          r._id === recipeId ? { ...r, likeCount: r.likeCount + 1 } : r
        )
      );

      setFilteredRecipes((prev) =>
        prev.map((r) =>
          r._id === recipeId ? { ...r, likeCount: r.likeCount + 1 } : r
        )
      );

      toast.success("Liked the recipe!");
    } catch (error) {
      toast.error("Failed to like recipe");
    }
  };

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {categoryParam ? `${categoryParam} Recipes` : "All Recipes"}
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="relative w-full md:w-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="input input-bordered w-full pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiSearch size={18} />
              </button>
            </form>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by cuisine:
              </span>
              <select
                value={selectedCuisine}
                onChange={(e) => handleCuisineChange(e.target.value)}
                className="select select-bordered"
              >
                {cuisineTypes.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <RecipeList
          recipes={filteredRecipes}
          onLike={(id) => handleLike(id)}
          emptyMessage={
            searchTerm || selectedCuisine !== "All" || categoryParam
              ? "No recipes found matching your filters."
              : "No recipes found. Be the first to add one!"
          }
        />
      </div>
    </div>
  );
};

export default AllRecipes;
