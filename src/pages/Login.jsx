import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiLock, FiGithub } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      setError('')
      await login(data.email, data.password)
      navigate(from, { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setError('')
      await loginWithGoogle()
      navigate(from, { replace: true })
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

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
          Log in to your account
        </h2>
        
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            {errors.password && <span className="text-error text-sm mt-1">{errors.password.message}</span>}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
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
                  Logging in...
                </>
              ) : 'Log In'}
            </button>
          </div>
        </form>
        
        <div className="divider text-gray-500">OR</div>
        
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full"
          disabled={isLoading}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login