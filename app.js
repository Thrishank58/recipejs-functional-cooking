const RecipeApp = (() => {

  // ===============================
  // Recipe Data
  // ===============================

  const recipes = [
    {
      id: 1,
      title: "Garlic Butter Pasta",
      time: 20,
      difficulty: "easy",
      description: "Creamy garlic butter pasta with herbs.",
      category: "pasta",
      ingredients: ["Pasta", "Garlic", "Butter", "Parsley", "Salt"],
      steps: [
        "Boil water and cook pasta.",
        {
          text: "Prepare garlic butter sauce",
          substeps: [
            "Melt butter in pan.",
            "Add minced garlic.",
            "Cook until fragrant."
          ]
        },
        "Mix pasta with sauce and garnish."
      ]
    },
    {
      id: 2,
      title: "Avocado Toast Supreme",
      time: 15,
      difficulty: "easy",
      description: "Crispy toast topped with smashed avocado and spices.",
      category: "breakfast",
      ingredients: ["Bread", "Avocado", "Salt", "Pepper", "Chili flakes"],
      steps: [
        "Toast the bread.",
        "Mash avocado with salt and pepper.",
        "Spread on toast and garnish."
      ]
    },
    {
      id: 3,
      title: "Chicken Alfredo",
      time: 45,
      difficulty: "medium",
      description: "Rich Alfredo sauce with grilled chicken.",
      category: "pasta",
      ingredients: ["Chicken", "Cream", "Parmesan", "Garlic", "Pasta"],
      steps: [
        "Grill chicken.",
        "Boil pasta.",
        "Prepare Alfredo sauce.",
        "Combine everything and serve."
      ]
    },
    {
      id: 4,
      title: "Vegetable Stir Fry",
      time: 30,
      difficulty: "medium",
      description: "Colorful vegetables tossed in soy garlic sauce.",
      category: "vegan",
      ingredients: ["Bell peppers", "Broccoli", "Soy sauce", "Garlic", "Carrots"],
      steps: [
        "Chop vegetables.",
        "Heat oil in wok.",
        "Stir fry vegetables.",
        "Add sauce and toss."
      ]
    },
    {
      id: 5,
      title: "Beef Wellington",
      time: 90,
      difficulty: "hard",
      description: "Tender beef wrapped in puff pastry.",
      category: "meat",
      ingredients: ["Beef fillet", "Mushrooms", "Puff pastry", "Egg yolk"],
      steps: [
        "Sear the beef.",
        {
          text: "Prepare mushroom duxelles",
          substeps: [
            "Finely chop mushrooms.",
            "Cook until moisture evaporates.",
            {
              text: "Season mixture",
              substeps: [
                "Add salt.",
                "Add pepper."
              ]
            }
          ]
        },
        "Wrap beef in pastry.",
        "Bake until golden."
      ]
    },
    {
      id: 6,
      title: "Butter Chicken Curry",
      time: 75,
      difficulty: "hard",
      description: "Creamy tomato-based Indian curry.",
      category: "curry",
      ingredients: ["Chicken", "Tomato puree", "Cream", "Spices", "Butter"],
      steps: [
        "Marinate chicken.",
        "Cook chicken.",
        "Prepare curry base.",
        "Simmer together."
      ]
    },
    {
      id: 7,
      title: "Caesar Salad",
      time: 25,
      difficulty: "easy",
      description: "Fresh romaine with Caesar dressing and croutons.",
      category: "salad",
      ingredients: ["Romaine", "Croutons", "Parmesan", "Caesar dressing"],
      steps: [
        "Wash lettuce.",
        "Add croutons and cheese.",
        "Toss with dressing."
      ]
    },
    {
      id: 8,
      title: "Ramen Bowl Deluxe",
      time: 60,
      difficulty: "medium",
      description: "Japanese-style ramen with egg and veggies.",
      category: "soup",
      ingredients: ["Ramen noodles", "Egg", "Broth", "Vegetables", "Soy sauce"],
      steps: [
        "Boil broth.",
        "Cook noodles.",
        {
          text: "Prepare toppings",
          substeps: [
            "Soft boil egg.",
            "Slice vegetables."
          ]
        },
        "Assemble bowl."
      ]
    }
  ];

  // ===============================
  // State
  // ===============================

  let currentFilter = "all";
  let currentSort = null;
  let currentSearch = "";
  let showFavoritesOnly = false;

  let favorites = new Set(JSON.parse(localStorage.getItem("favorites")) || []);

  const recipeContainer = document.querySelector("#recipe-container");
  const searchInput = document.querySelector("#search-input");
  const favoritesFilterBtn = document.querySelector("#favorites-filter");

  // ===============================
  // Utility: Debounce
  // ===============================

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // ===============================
  // Pure Functions
  // ===============================

  const applySearch = (data, searchTerm) => {
    if (!searchTerm) return data;

    const lower = searchTerm.toLowerCase();

    return data.filter(recipe =>
      recipe.title.toLowerCase().includes(lower) ||
      recipe.ingredients.some(ing =>
        ing.toLowerCase().includes(lower)
      )
    );
  };

  const applyFilter = (data, filter) => {
    if (filter === "all") return data;
    if (filter === "quick") return data.filter(r => r.time < 30);
    return data.filter(r => r.difficulty === filter);
  };

  const applyFavoritesFilter = (data) => {
    if (!showFavoritesOnly) return data;
    return data.filter(recipe => favorites.has(recipe.id));
  };

  const applySort = (data, sortType) => {
    if (!sortType) return data;
    const cloned = [...data];

    if (sortType === "name") {
      return cloned.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "time") {
      return cloned.sort((a, b) => a.time - b.time);
    }

    return cloned;
  };

  const renderSteps = (stepsArray) => {
    return `
      <ul>
        ${stepsArray.map(step => {
          if (typeof step === "string") {
            return `<li>${step}</li>`;
          }
          return `
            <li>
              ${step.text}
              ${step.substeps ? renderSteps(step.substeps) : ""}
            </li>
          `;
        }).join("")}
      </ul>
    `;
  };

  // ===============================
  // Card Renderer
  // ===============================

  const createRecipeCard = (recipe) => {
    const isFav = favorites.has(recipe.id);

    return `
      <div class="recipe-card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>${recipe.title}</h3>
          <button class="favorite-btn" data-id="${recipe.id}">
            ${isFav ? "❤️" : "🤍"}
          </button>
        </div>

        <div class="recipe-meta">
          <span>⏱️ ${recipe.time} min</span>
          <span class="difficulty ${recipe.difficulty}">
            ${recipe.difficulty}
          </span>
        </div>

        <p>${recipe.description}</p>

        <button class="toggle-steps">Show Steps</button>
        <button class="toggle-ingredients">Show Ingredients</button>

        <div class="steps hidden">
          ${renderSteps(recipe.steps)}
        </div>

        <div class="ingredients hidden">
          <ul>
            ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  };

  // ===============================
  // Central Update
  // ===============================

  const updateDisplay = () => {

    let result = recipes;

    result = applySearch(result, currentSearch);
    result = applyFilter(result, currentFilter);
    result = applyFavoritesFilter(result);
    result = applySort(result, currentSort);

    recipeContainer.innerHTML = result
      .map(createRecipeCard)
      .join("");

    document.querySelector("#recipe-count").textContent =
      `Showing ${result.length} of ${recipes.length} recipes`;
  };

  // ===============================
  // Event Listeners
  // ===============================

  const setupEventListeners = () => {

    document.addEventListener("click", (e) => {

      if (e.target.dataset.filter) {
        currentFilter = e.target.dataset.filter;
        updateDisplay();
      }

      if (e.target.dataset.sort) {
        currentSort = e.target.dataset.sort;
        updateDisplay();
      }

      if (e.target.classList.contains("toggle-steps")) {
        const card = e.target.closest(".recipe-card");
        card.querySelector(".steps").classList.toggle("hidden");
      }

      if (e.target.classList.contains("toggle-ingredients")) {
        const card = e.target.closest(".recipe-card");
        card.querySelector(".ingredients").classList.toggle("hidden");
      }

      if (e.target.classList.contains("favorite-btn")) {
        const id = Number(e.target.dataset.id);

        if (favorites.has(id)) {
          favorites.delete(id);
        } else {
          favorites.add(id);
        }

        localStorage.setItem("favorites", JSON.stringify([...favorites]));
        updateDisplay();
      }

    });

    searchInput.addEventListener(
      "input",
      debounce((e) => {
        currentSearch = e.target.value;
        updateDisplay();
      }, 300)
    );

    favoritesFilterBtn.addEventListener("click", () => {
      showFavoritesOnly = !showFavoritesOnly;
      updateDisplay();
    });

  };

  const init = () => {
    updateDisplay();
    setupEventListeners();
  };

  return { init };

})();

RecipeApp.init();
