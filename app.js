// Recipe Data
const recipes = [
  { id: 1, title: "Garlic Butter Pasta", time: 20, difficulty: "easy", description: "Creamy garlic butter pasta with herbs.", category: "pasta" },
  { id: 2, title: "Avocado Toast Supreme", time: 15, difficulty: "easy", description: "Crispy toast topped with smashed avocado and spices.", category: "breakfast" },
  { id: 3, title: "Chicken Alfredo", time: 45, difficulty: "medium", description: "Rich Alfredo sauce with grilled chicken.", category: "pasta" },
  { id: 4, title: "Vegetable Stir Fry", time: 30, difficulty: "medium", description: "Colorful vegetables tossed in soy garlic sauce.", category: "vegan" },
  { id: 5, title: "Beef Wellington", time: 90, difficulty: "hard", description: "Tender beef wrapped in puff pastry.", category: "meat" },
  { id: 6, title: "Butter Chicken Curry", time: 75, difficulty: "hard", description: "Creamy tomato-based Indian curry.", category: "curry" },
  { id: 7, title: "Caesar Salad", time: 25, difficulty: "easy", description: "Fresh romaine with Caesar dressing and croutons.", category: "salad" },
  { id: 8, title: "Ramen Bowl Deluxe", time: 60, difficulty: "medium", description: "Japanese-style ramen with egg and veggies.", category: "soup" }
];

// Select container
const recipeContainer = document.querySelector("#recipe-container");

// Create recipe card
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// Render recipes
const renderRecipes = (recipesArray) => {
  const recipesHTML = recipesArray
    .map(recipe => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipesHTML;
};

// Initialize
renderRecipes(recipes);
