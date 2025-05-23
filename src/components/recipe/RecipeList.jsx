import RecipeCard from './RecipeCard'

const RecipeList = ({ recipes, onLike, emptyMessage = "No recipes found." }) => {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-gray-600 dark:text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onLike={onLike}
        />
      ))}
    </div>
  )
}

export default RecipeList