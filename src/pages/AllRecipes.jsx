import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import RecipeList from '../components/recipe/RecipeList'
import dummyRecipes from '../data/dummyRecipes'
import toast from 'react-hot-toast'
import { FiSearch } from 'react-icons/fi'

const cuisineTypes = ['All', 'Italian', 'Mexican', 'Indian', 'Chinese', 'American', 'Thai', 'Japanese', 'French', 'Mediterranean', 'Others']

const AllRecipes = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get category from URL params
  const categoryParam = searchParams.get('category')
  
  useEffect(() => {
    // In a real app, this would be an API call
    setRecipes(dummyRecipes)
    
    // Initial filtering based on URL category param
    if (categoryParam) {
      const filtered = dummyRecipes.filter(recipe => 
        recipe.categories.includes(categoryParam)
      )
      setFilteredRecipes(filtered)
    } else {
      setFilteredRecipes(dummyRecipes)
    }
  }, [categoryParam])
  
  // Filter recipes when cuisine or search term changes
  useEffect(() => {
    let result = [...recipes]
    
    // Filter by cuisine
    if (selectedCuisine !== 'All') {
      result = result.filter(recipe => recipe.cuisineType === selectedCuisine)
    }
    
    // Filter by category (from URL)
    if (categoryParam) {
      result = result.filter(recipe => 
        recipe.categories.includes(categoryParam)
      )
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(recipe => 
        recipe.title.toLowerCase().includes(term) || 
        recipe.cuisineType.toLowerCase().includes(term) ||
        recipe.categories.some(cat => cat.toLowerCase().includes(term))
      )
    }
    
    setFilteredRecipes(result)
  }, [selectedCuisine, searchTerm, recipes, categoryParam])
  
  const handleCuisineChange = (cuisine) => {
    setSelectedCuisine(cuisine)
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }
  
  const handleLike = async (recipeId) => {
    try {
      // In a real app, this would be an API call
      setRecipes(recipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likeCount: recipe.likeCount + 1 } 
          : recipe
      ))
      
      // Update filtered recipes as well
      setFilteredRecipes(filteredRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likeCount: recipe.likeCount + 1 } 
          : recipe
      ))
      
      toast.success('Recipe liked!')
    } catch (error) {
      toast.error('Failed to like recipe')
    }
  }

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {categoryParam ? `${categoryParam} Recipes` : 'All Recipes'}
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto">
              <form onSubmit={handleSearch} className="relative">
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
            </div>
            
            <div className="w-full md:w-auto flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by cuisine:
              </span>
              <select
                value={selectedCuisine}
                onChange={(e) => handleCuisineChange(e.target.value)}
                className="select select-bordered"
              >
                {cuisineTypes.map(cuisine => (
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
          onLike={handleLike} 
          emptyMessage={
            searchTerm || selectedCuisine !== 'All' || categoryParam
              ? "No recipes found matching your filters."
              : "No recipes found. Be the first to add one!"
          }
        />
      </div>
    </div>
  )
}

export default AllRecipes