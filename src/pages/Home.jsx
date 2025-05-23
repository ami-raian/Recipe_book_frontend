import { useState, useEffect } from 'react'
import Banner from '../components/home/Banner'
import FeaturedRecipes from '../components/home/FeaturedRecipes'
import Categories from '../components/home/Categories'
import CommunitySection from '../components/home/CommunitySection'
import dummyRecipes from '../data/dummyRecipes'
import toast from 'react-hot-toast'

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([])

  useEffect(() => {
    // Sort recipes by like count and take the top 6
    const topRecipes = [...dummyRecipes]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 6)
    
    setFeaturedRecipes(topRecipes)
  }, [])

  const handleLike = async (recipeId) => {
    try {
      // In a real app, this would be an API call
      setFeaturedRecipes(featuredRecipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likeCount: recipe.likeCount + 1 } 
          : recipe
      ))
      
      toast.success('Recipe liked!')
      
      // Re-sort recipes after like
      setFeaturedRecipes(prev => 
        [...prev].sort((a, b) => b.likeCount - a.likeCount)
      )
    } catch (error) {
      toast.error('Failed to like recipe')
    }
  }

  return (
    <div>
      <Banner />
      <FeaturedRecipes recipes={featuredRecipes} onLike={handleLike} />
      <Categories />
      <CommunitySection />
    </div>
  )
}

export default Home