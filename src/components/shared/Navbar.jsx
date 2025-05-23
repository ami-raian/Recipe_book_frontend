import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <span role="img" aria-label="recipe book icon">🍳</span>
          Recipe Book
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-primary font-medium" 
                : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/all-recipes" 
            className={({ isActive }) => 
              isActive 
                ? "text-primary font-medium" 
                : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            }
          >
            All Recipes
          </NavLink>
          {user && (
            <>
              <NavLink 
                to="/add-recipe" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-primary font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                }
              >
                Add Recipe
              </NavLink>
              <NavLink 
                to="/my-recipes" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-primary font-medium" 
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                }
              >
                My Recipes
              </NavLink>
            </>
          )}
          
          <ThemeToggle />
          
          {user ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <img 
                  src={user.photoURL || 'https://i.pravatar.cc/150?img=3'} 
                  alt={user.displayName} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                    {user.displayName}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link 
                to="/auth/login" 
                className="btn btn-sm btn-outline btn-primary"
              >
                Login
              </Link>
              <Link 
                to="/auth/register" 
                className="btn btn-sm btn-primary"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="container py-3 space-y-2">
            <NavLink 
              to="/" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block py-2 text-primary font-medium" 
                  : "block py-2 text-gray-700 dark:text-gray-300"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/all-recipes" 
              onClick={closeMenu}
              className={({ isActive }) => 
                isActive 
                  ? "block py-2 text-primary font-medium" 
                  : "block py-2 text-gray-700 dark:text-gray-300"
              }
            >
              All Recipes
            </NavLink>
            {user && (
              <>
                <NavLink 
                  to="/add-recipe" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    isActive 
                      ? "block py-2 text-primary font-medium" 
                      : "block py-2 text-gray-700 dark:text-gray-300"
                  }
                >
                  Add Recipe
                </NavLink>
                <NavLink 
                  to="/my-recipes" 
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    isActive 
                      ? "block py-2 text-primary font-medium" 
                      : "block py-2 text-gray-700 dark:text-gray-300"
                  }
                >
                  My Recipes
                </NavLink>
                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.photoURL || 'https://i.pravatar.cc/150?img=3'} 
                      alt={user.displayName} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{user.displayName}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-accent hover:text-accent/80"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {!user && (
              <div className="flex space-x-2 pt-2">
                <Link 
                  to="/auth/login" 
                  onClick={closeMenu}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Login
                </Link>
                <Link 
                  to="/auth/register" 
                  onClick={closeMenu}
                  className="btn btn-sm btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
            
            <div className="py-2 flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar