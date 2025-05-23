import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiMail, FiLock, FiImage } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

const Register = () => {
  const { register: registerUser, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch('password', '')
  
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setError('')
      await registerUser(data.name, data.email, data.password, data.photoURL)
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true)
      setError('')
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Password validation functions
  const hasUpperCase = (value) => /[A-Z]/.test(value)
  const hasLowerCase = (value) => /[a-z]/.test(value)
  const hasMinLength = (value) => value.length >= 6

  return (
    <div className="card bg-white dark:bg-gray-800 shadow-xl">
      <div className="card-body">
        <div className="flex justify-center mb-4">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
            <span role="img" aria-label="recipe book icon">🍳</span>
            Recipe Book
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create your account
        </h2>
        
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <div className="input-group">
              <span className="flex items-center justify-center w-10 bg-gray-100 dark:bg-gray-700 border-y border-l border-gray-300 dark:border-gray-600 rounded-l-md">
                <FiUser className="text-gray-500" />
              </span>
              <input
                type="text"
                className={`input input-bordered w-full rounded-l-none ${errors.name ? 'input-error' : ''}`}
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="input-group">
              <span className="flex items-center justify-center w-10 bg-gray-100 dark:bg-gray-700 border-y border-l border-gray-300 dark:border-gray-600 rounded-l-md">
                <FiMail className="text-gray-500" />
              </span>
              <input
                type="email"
                className={`input input-bordered w-full rounded-l-none ${errors.email ? 'input-error' : ''}`}
                placeholder="your@email.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile Photo URL (optional)</span>
            </label>
            <div className="input-group">
              <span className="flex items-center justify-center w-10 bg-gray-100 dark:bg-gray-700 border-y border-l border-gray-300 dark:border-gray-600 rounded-l-md">
                <FiImage className="text-gray-500" />
              </span>
              <input
                type="text"
                className="input input-bordered w-full rounded-l-none"
                placeholder="https://example.com/photo.jpg"
                {...register('photoURL')}
              />
            </div>
            <span className="text-xs text-gray-500 mt-1">Leave empty for default avatar</span>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="input-group">
              <span className="flex items-center justify-center w-10 bg-gray-100 dark:bg-gray-700 border-y border-l border-gray-300 dark:border-gray-600 rounded-l-md">
                <FiLock className="text-gray-500" />
              </span>
              <input
                type="password"
                className={`input input-bordered w-full rounded-l-none ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                {...register('password', { 
                  required: 'Password is required',
                  validate: {
                    hasUpperCase: (value) => hasUpperCase(value) || 'Password must contain at least one uppercase letter',
                    hasLowerCase: (value) => hasLowerCase(value) || 'Password must contain at least one lowercase letter',
                    hasMinLength: (value) => hasMinLength(value) || 'Password must be at least 6 characters long'
                  }
                })}
              />
            </div>
            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
            
            {/* Password strength indicators */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${hasUpperCase(password) ? 'bg-success' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className={`text-xs ${hasUpperCase(password) ? 'text-success' : 'text-gray-500'}`}>
                    Contains uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${hasLowerCase(password) ? 'bg-success' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className={`text-xs ${hasLowerCase(password) ? 'text-success' : 'text-gray-500'}`}>
                    Contains lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${hasMinLength(password) ? 'bg-success' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <span className={`text-xs ${hasMinLength(password) ? 'text-success' : 'text-gray-500'}`}>
                    At least 6 characters long
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="divider text-gray-500">OR</div>
        
        <button 
          type="button"
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full"
          disabled={isLoading}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register