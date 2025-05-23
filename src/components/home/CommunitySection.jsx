import { Link } from 'react-router-dom'

const CommunitySection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Community of Food Lovers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect with fellow food enthusiasts, share your culinary creations, and discover new recipes from around the world. Our platform makes it easy to organize your favorite recipes, create your own collection, and inspire others with your unique cooking style.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span role="img" aria-label="share icon">📝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Create & Share</h3>
                  <p className="text-gray-600 dark:text-gray-400">Upload your own recipes and share them with the community</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span role="img" aria-label="discover icon">🔍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Discover</h3>
                  <p className="text-gray-600 dark:text-gray-400">Find new recipes and cooking inspiration</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <span role="img" aria-label="save icon">❤️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Save & Like</h3>
                  <p className="text-gray-600 dark:text-gray-400">Like your favorite recipes and build your collection</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/auth/register" className="btn btn-primary">
                Join Now - It's Free!
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.pexels.com/photos/1435901/pexels-photo-1435901.jpeg" 
              alt="Community cooking" 
              className="rounded-lg shadow-md w-full h-40 object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/6607387/pexels-photo-6607387.jpeg" 
              alt="Recipe sharing" 
              className="rounded-lg shadow-md w-full h-40 object-cover mt-8"
            />
            <img 
              src="https://images.pexels.com/photos/4871173/pexels-photo-4871173.jpeg" 
              alt="Food preparation" 
              className="rounded-lg shadow-md w-full h-40 object-cover"
            />
            <img 
              src="https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg" 
              alt="Cooking together" 
              className="rounded-lg shadow-md w-full h-40 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection