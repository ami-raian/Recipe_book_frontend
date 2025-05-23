import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 mb-4">
              <span role="img" aria-label="recipe book icon">🍳</span>
              Recipe Book
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A place for food enthusiasts to discover, share, and save their favorite recipes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-recipes" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="/add-recipe" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link to="/my-recipes" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  My Recipes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Us</h3>
            <address className="text-gray-600 dark:text-gray-400 not-italic">
              <p>123 Recipe Street</p>
              <p>Foodville, FK 12345</p>
              <p className="mt-2">contact@recipebook.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} Recipe Book. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer