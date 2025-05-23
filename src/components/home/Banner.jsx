import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-16">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Find inspiration for your next meal, save your favorites, and
              share your culinary creations with a community of food
              enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/all-recipes" className="btn btn-secondary">
                Browse Recipes
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
              >
                Join Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full"></div>
              <img
                src="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
                alt="Delicious meal"
                className="w-full h-full object-cover rounded-lg shadow-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </div>
  );
};

export default Banner;
