import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiCoffee,
  FiSunrise,
  FiSunset,
  FiHeart,
  // FiCake,
} from "react-icons/fi";

const categories = [
  {
    name: "Breakfast",
    icon: <FiSunrise size={24} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Lunch",
    icon: <FiCoffee size={24} />,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Dinner",
    icon: <FiSunset size={24} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Dessert",
    icon: <FiSunset size={24} />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Vegan",
    icon: <FiHeart size={24} />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Quick Meals",
    icon: <FiBriefcase size={24} />,
    color: "bg-teal-100 text-teal-600",
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover recipes by category to find exactly what you are looking
            for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/all-recipes?category=${category.name}`}
              className="flex flex-col items-center p-6 rounded-lg shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-900"
            >
              <div className={`p-4 rounded-full ${category.color} mb-4`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
