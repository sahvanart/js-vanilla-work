const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const randomMealBtn = document.querySelector(".random-meal");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavMeals();

randomMealBtn.addEventListener("click", getRandomMeal);

searchBtn.addEventListener("click", async () => {
  // clean container
  mealsEl.innerHTML = "";

  const search = searchTerm.value;
  const meals = await getMealsBySearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

popupCloseBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}

async function fetchFavMeals() {
  // clean the container
  favoriteContainer.innerHTML = "";

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);

    addMealFav(meal);
  }
}

function addMeal(mealData, random = false) {
  // console.log(mealData);

  const meal = document.createElement("div");

  meal.classList.add("meal");

  meal.innerHTML = `
        <div class="meal-header">
            ${
              random
                ? `
            <span class="random"> Random Recipe </span>`
                : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

  const btn = meal.querySelector(".meal-body .fav-btn");
  const img = meal.querySelector("img");
  const h4 = meal.querySelector("h4");

  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
  });

  img.addEventListener("click", () => {
    showMealInfo(mealData);
  });
  h4.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

  const btn = favMeal.querySelector(".clear");
  const img = favMeal.querySelector("img");

  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);

    fetchFavMeals();
  });

  img.addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  // clean it up
  mealInfoEl.innerHTML = "";

  // update the Meal info
  const mealEl = document.createElement("div");

  const ingredients = [];

  // get ingredients and measures
  // recipes require max 20 ingredients
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
              .map(
                (ing) => `
            <li>${ing}</li>
            `
              )
              .join("")}
        </ul>
    `;

  mealInfoEl.appendChild(mealEl);

  // show the popup
  mealPopup.classList.remove("hidden");
}
