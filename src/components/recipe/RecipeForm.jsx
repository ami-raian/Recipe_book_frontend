import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const cuisineTypes = ['Italian', 'Mexican', 'Indian', 'Chinese', 'American', 'Thai', 'Japanese', 'French', 'Mediterranean', 'Others']
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer', 'Snack', 'Vegan', 'Vegetarian', 'Gluten-Free']

const RecipeForm = ({ initialData, onSubmit, buttonText = 'Submit' }) => {
  const [ingredients, setIngredients] = useState(initialData?.ingredients || [''])
  const [instructions, setInstructions] = useState(initialData?.instructions || [''])
  const [selectedCategories, setSelectedCategories] = useState(initialData?.categories || [])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {
      title: '',
      image: '',
      preparationTime: 30,
      cuisineType: 'Italian'
    }
  })

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients]
      newIngredients.splice(index, 1)
      setIngredients(newIngredients)
    } else {
      toast.error('Recipe must have at least one ingredient')
    }
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const addInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = [...instructions]
      newInstructions.splice(index, 1)
      setInstructions(newInstructions)
    } else {
      toast.error('Recipe must have at least one instruction')
    }
  }

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions]
    newInstructions[index] = value
    setInstructions(newInstructions)
  }

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const onFormSubmit = (data) => {
    if (ingredients.some(ingredient => !ingredient.trim())) {
      toast.error('All ingredients must be filled out')
      return
    }

    if (instructions.some(instruction => !instruction.trim())) {
      toast.error('All instructions must be filled out')
      return
    }

    if (selectedCategories.length === 0) {
      toast.error('Please select at least one category')
      return
    }

    const formData = {
      ...data,
      ingredients: ingredients.filter(i => i.trim()),
      instructions: instructions.filter(i => i.trim()),
      categories: selectedCategories,
      preparationTime: parseInt(data.preparationTime)
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Recipe Title</span>
        </label>
        <input 
          type="text" 
          className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Image URL</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered w-full"
          placeholder="https://example.com/image.jpg"
          {...register('image')}
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty for default image</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Cuisine Type</span>
          </label>
          <select 
            className="select select-bordered w-full"
            {...register('cuisineType', { required: 'Cuisine type is required' })}
          >
            {cuisineTypes.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Preparation Time (minutes)</span>
          </label>
          <input 
            type="number" 
            className={`input input-bordered w-full ${errors.preparationTime ? 'input-error' : ''}`}
            min="1"
            {...register('preparationTime', { 
              required: 'Preparation time is required',
              min: { value: 1, message: 'Preparation time must be at least 1 minute' }
            })}
          />
          {errors.preparationTime && <span className="text-error text-sm mt-1">{errors.preparationTime.message}</span>}
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Ingredients</span>
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input 
              type="text" 
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="input input-bordered w-full"
              placeholder={`Ingredient ${index + 1}`}
            />
            <button 
              type="button"
              onClick={() => removeIngredient(index)}
              className="btn btn-square btn-outline btn-error btn-sm"
            >
              ×
            </button>
          </div>
        ))}
        <button 
          type="button"
          onClick={addIngredient}
          className="btn btn-outline btn-sm mt-2"
        >
          Add Ingredient
        </button>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Instructions</span>
        </label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <textarea 
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder={`Step ${index + 1}`}
              rows="2"
            />
            <button 
              type="button"
              onClick={() => removeInstruction(index)}
              className="btn btn-square btn-outline btn-error btn-sm"
            >
              ×
            </button>
          </div>
        ))}
        <button 
          type="button"
          onClick={addInstruction}
          className="btn btn-outline btn-sm mt-2"
        >
          Add Instruction
        </button>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Categories (select at least one)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <label key={category} className="cursor-pointer flex items-center gap-1">
              <input 
                type="checkbox" 
                className="checkbox checkbox-primary checkbox-sm"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span className="label-text">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Processing...
          </>
        ) : buttonText}
      </button>
    </form>
  )
}

export default RecipeForm