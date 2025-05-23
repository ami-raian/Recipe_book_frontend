// Dummy recipes data
const dummyRecipes = [
  {
    id: 1,
    title: 'Homemade Margherita Pizza',
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
    ingredients: [
      '500g pizza dough',
      '200g tomato sauce',
      '250g fresh mozzarella',
      'Fresh basil leaves',
      'Olive oil',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Preheat oven to 500°F (260°C) with a pizza stone inside.',
      'Roll out the pizza dough on a floured surface to your desired thickness.',
      'Spread tomato sauce evenly over the dough, leaving a small border for the crust.',
      'Tear mozzarella into pieces and distribute evenly over the sauce.',
      'Bake for 8-10 minutes until the crust is golden and the cheese is bubbly.',
      'Remove from oven, top with fresh basil leaves, a drizzle of olive oil, and salt and pepper.'
    ],
    cuisineType: 'Italian',
    preparationTime: 30,
    categories: ['Dinner', 'Lunch', 'Vegetarian'],
    likeCount: 156,
    userId: 'user1',
    user: {
      displayName: 'Maria Rossi',
      photoURL: 'https://i.pravatar.cc/150?img=32'
    }
  },
  {
    id: 2,
    title: 'Classic Beef Tacos',
    image: 'https://images.pexels.com/photos/5737377/pexels-photo-5737377.jpeg',
    ingredients: [
      '500g ground beef',
      '1 packet taco seasoning',
      '8 hard taco shells',
      'Shredded lettuce',
      'Diced tomatoes',
      'Shredded cheese',
      'Sour cream',
      'Salsa'
    ],
    instructions: [
      'Brown the ground beef in a skillet over medium heat.',
      'Drain excess fat and add taco seasoning with water according to package instructions.',
      'Simmer for 5-7 minutes until the sauce thickens.',
      'Heat taco shells according to package directions.',
      'Fill shells with beef mixture and top with lettuce, tomatoes, cheese, sour cream, and salsa.'
    ],
    cuisineType: 'Mexican',
    preparationTime: 25,
    categories: ['Dinner', 'Lunch'],
    likeCount: 129,
    userId: 'user2',
    user: {
      displayName: 'Carlos Mendez',
      photoURL: 'https://i.pravatar.cc/150?img=53'
    }
  },
  {
    id: 3,
    title: 'Vegetable Curry',
    image: 'https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg',
    ingredients: [
      '2 tbsp vegetable oil',
      '1 onion, chopped',
      '3 cloves garlic, minced',
      '1 tbsp curry powder',
      '1 tsp ground turmeric',
      '1 can (400ml) coconut milk',
      '2 cups mixed vegetables (carrots, potatoes, peas, cauliflower)',
      'Salt to taste',
      'Fresh cilantro for garnish',
      'Cooked rice for serving'
    ],
    instructions: [
      'Heat oil in a large pot over medium heat. Add onions and sauté until translucent.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Stir in curry powder and turmeric, cooking for 30 seconds.',
      'Add vegetables and stir to coat with spices.',
      'Pour in coconut milk, bring to a simmer, and cook covered for 15-20 minutes until vegetables are tender.',
      'Season with salt to taste and garnish with fresh cilantro.',
      'Serve hot over rice.'
    ],
    cuisineType: 'Indian',
    preparationTime: 35,
    categories: ['Dinner', 'Vegan', 'Vegetarian'],
    likeCount: 178,
    userId: 'user3',
    user: {
      displayName: 'Priya Sharma',
      photoURL: 'https://i.pravatar.cc/150?img=47'
    }
  },
  {
    id: 4,
    title: 'Chocolate Chip Cookies',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg',
    ingredients: [
      '1 cup butter, softened',
      '1 cup white sugar',
      '1 cup packed brown sugar',
      '2 eggs',
      '2 tsp vanilla extract',
      '3 cups all-purpose flour',
      '1 tsp baking soda',
      '2 tsp hot water',
      '1/2 tsp salt',
      '2 cups semisweet chocolate chips'
    ],
    instructions: [
      'Preheat oven to 350°F (175°C).',
      'Cream together butter and sugars until smooth.',
      'Beat in eggs one at a time, then stir in vanilla.',
      'Dissolve baking soda in hot water and add to batter along with salt.',
      'Stir in flour and chocolate chips.',
      'Drop by large spoonfuls onto ungreased pans.',
      'Bake for about 10 minutes or until edges are nicely browned.'
    ],
    cuisineType: 'American',
    preparationTime: 25,
    categories: ['Dessert', 'Snack'],
    likeCount: 200,
    userId: 'user4',
    user: {
      displayName: 'Emma Johnson',
      photoURL: 'https://i.pravatar.cc/150?img=23'
    }
  },
  {
    id: 5,
    title: 'Classic Caesar Salad',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    ingredients: [
      '1 large head of romaine lettuce, chopped',
      '1/2 cup Caesar dressing',
      '1/2 cup croutons',
      '1/4 cup grated Parmesan cheese',
      'Black pepper to taste',
      'Lemon wedges for serving'
    ],
    instructions: [
      'Wash and dry the romaine lettuce thoroughly.',
      'Tear or chop the lettuce into bite-sized pieces and place in a large bowl.',
      'Add Caesar dressing and toss to coat evenly.',
      'Add croutons and grated Parmesan cheese.',
      'Season with freshly ground black pepper.',
      'Serve with lemon wedges on the side.'
    ],
    cuisineType: 'Italian',
    preparationTime: 15,
    categories: ['Lunch', 'Appetizer', 'Vegetarian'],
    likeCount: 98,
    userId: 'user5',
    user: {
      displayName: 'Alex Williams',
      photoURL: 'https://i.pravatar.cc/150?img=12'
    }
  },
  {
    id: 6,
    title: 'Pad Thai',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg',
    ingredients: [
      '8 oz rice noodles',
      '2 tbsp vegetable oil',
      '2 eggs, beaten',
      '1 lb chicken, shrimp, or tofu',
      '2 cloves garlic, minced',
      '1 shallot, minced',
      '2 tbsp fish sauce',
      '2 tbsp tamarind paste',
      '2 tbsp brown sugar',
      '1 cup bean sprouts',
      '1/4 cup chopped peanuts',
      'Lime wedges',
      'Cilantro for garnish'
    ],
    instructions: [
      'Soak rice noodles in hot water until softened, then drain.',
      'Heat oil in a wok over high heat. Add garlic and shallots, stir-frying until fragrant.',
      'Add chicken/shrimp/tofu and cook until done.',
      'Push ingredients to one side and scramble eggs on the other side.',
      'Add noodles, fish sauce, tamarind paste, and brown sugar. Stir-fry until well combined.',
      'Add bean sprouts and half the peanuts, stirring to combine.',
      'Serve hot, garnished with remaining peanuts, lime wedges, and cilantro.'
    ],
    cuisineType: 'Thai',
    preparationTime: 35,
    categories: ['Dinner', 'Lunch'],
    likeCount: 166,
    userId: 'user6',
    user: {
      displayName: 'Sam Thompson',
      photoURL: 'https://i.pravatar.cc/150?img=33'
    }
  },
  {
    id: 7,
    title: 'Avocado Toast',
    image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '1/2 lemon, juiced',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)',
      '2 eggs (optional)'
    ],
    instructions: [
      'Toast the bread to your desired level of crispness.',
      'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.',
      'Add lemon juice, salt, and pepper to the avocado and mash with a fork.',
      'Spread the avocado mixture evenly on the toast.',
      'Top with red pepper flakes if desired.',
      'For an extra protein boost, top with a fried or poached egg.'
    ],
    cuisineType: 'American',
    preparationTime: 10,
    categories: ['Breakfast', 'Vegetarian'],
    likeCount: 89,
    userId: 'user7',
    user: {
      displayName: 'Jordan Lee',
      photoURL: 'https://i.pravatar.cc/150?img=59'
    }
  },
  {
    id: 8,
    title: 'Beef Stir Fry',
    image: 'https://images.pexels.com/photos/2093090/pexels-photo-2093090.jpeg',
    ingredients: [
      '500g beef sirloin, thinly sliced',
      '2 tbsp soy sauce',
      '1 tbsp sesame oil',
      '1 tbsp cornstarch',
      '2 tbsp vegetable oil',
      '2 cloves garlic, minced',
      '1 inch ginger, minced',
      '1 bell pepper, sliced',
      '1 onion, sliced',
      '2 cups broccoli florets',
      '1/4 cup beef broth',
      '2 tbsp oyster sauce',
      'Cooked rice for serving'
    ],
    instructions: [
      'In a bowl, mix beef with soy sauce, sesame oil, and cornstarch. Marinate for 15 minutes.',
      'Heat vegetable oil in a wok or large skillet over high heat.',
      'Add garlic and ginger, stir-frying for 30 seconds until fragrant.',
      'Add beef and stir-fry until browned, about 2-3 minutes. Remove and set aside.',
      'In the same wok, add more oil if needed and stir-fry vegetables until crisp-tender.',
      'Return beef to the wok, add beef broth and oyster sauce.',
      'Stir-fry for another 1-2 minutes until sauce thickens slightly.',
      'Serve hot over cooked rice.'
    ],
    cuisineType: 'Chinese',
    preparationTime: 30,
    categories: ['Dinner'],
    likeCount: 132,
    userId: 'user8',
    user: {
      displayName: 'Michael Wong',
      photoURL: 'https://i.pravatar.cc/150?img=66'
    }
  },
  {
    id: 9,
    title: 'Greek Salad',
    image: 'https://images.pexels.com/photos/1152237/pexels-photo-1152237.jpeg',
    ingredients: [
      '1 cucumber, diced',
      '2 large tomatoes, diced',
      '1 green bell pepper, diced',
      '1 red onion, thinly sliced',
      '200g feta cheese, cubed',
      '1/2 cup kalamata olives',
      '2 tbsp extra virgin olive oil',
      '1 tbsp red wine vinegar',
      '1 tsp dried oregano',
      'Salt and pepper to taste'
    ],
    instructions: [
      'In a large bowl, combine cucumber, tomatoes, bell pepper, and red onion.',
      'Add feta cheese and olives.',
      'In a small bowl, whisk together olive oil, red wine vinegar, oregano, salt, and pepper.',
      'Pour dressing over the salad and toss gently to combine.',
      'Let sit for 10 minutes before serving to allow flavors to meld.',
      'Serve chilled.'
    ],
    cuisineType: 'Mediterranean',
    preparationTime: 15,
    categories: ['Lunch', 'Appetizer', 'Vegetarian'],
    likeCount: 110,
    userId: 'user9',
    user: {
      displayName: 'Sophia Papadopoulos',
      photoURL: 'https://i.pravatar.cc/150?img=45'
    }
  },
  {
    id: 10,
    title: 'Pancakes',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
    ingredients: [
      '1 1/2 cups all-purpose flour',
      '3 1/2 tsp baking powder',
      '1 tsp salt',
      '1 tbsp white sugar',
      '1 1/4 cups milk',
      '1 egg',
      '3 tbsp butter, melted',
      'Maple syrup and fresh berries for serving'
    ],
    instructions: [
      'In a large bowl, sift together flour, baking powder, salt, and sugar.',
      'Make a well in the center and pour in milk, egg, and melted butter. Mix until smooth.',
      'Heat a lightly oiled griddle or frying pan over medium-high heat.',
      'Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.',
      'Cook until bubbles form and the edges are dry, then flip and cook until browned on the other side.',
      'Serve hot with maple syrup and fresh berries.'
    ],
    cuisineType: 'American',
    preparationTime: 20,
    categories: ['Breakfast', 'Vegetarian'],
    likeCount: 188,
    userId: 'user10',
    user: {
      displayName: 'David Anderson',
      photoURL: 'https://i.pravatar.cc/150?img=69'
    }
  }
];

export default dummyRecipes;