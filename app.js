// ===============================
// Recipe Data (DO NOT MUTATE)
// ===============================

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

// ===============================
// DOM Elements
// ===============================

const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// ===============================
// App State (controlled centrally)
// ===============================

let currentFilter = "all";
let currentSort = null;

// ===============================
// Pure Filtering Function
// ===============================

const applyFilter = (recipesArray, filter) => {
  if (filter === "all") return recipesArray;

  if (filter === "quick") {
    return recipesArray.filter(recipe => recipe.time < 30);
  }

  return recipesArray.filter(recipe => recipe.difficulty === filter);
};

// ===============================
// Pure Sorting Function
// ===============================

const applySort = (recipesArray, sortType) => {
  if (!sortType) return recipesArray;

  const sorted = [...recipesArray]; // clone to avoid mutation

  if (sortType === "name") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortType === "time") {
    return sorted.sort((a, b) => a.time - b.time);
  }

  return sorted;
};

// ===============================
// Create Recipe Card
// ===============================

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

// ===============================
// Central Update Function
// ===============================

const updateDisplay = () => {
  const filtered = applyFilter(recipes, currentFilter);
  const sorted = applySort(filtered, currentSort);

  const html = sorted.map(createRecipeCard).join("");
  recipeContainer.innerHTML = html;
};

// ===============================
// Event Listeners
// ===============================

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateDisplay();
  });
});

sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    updateDisplay();
  });
});

// ===============================
// Initialize
// ===============================

updateDisplay();
