// services/receta.js

// 🔥 NDRROJE ME API KEY-IN TAND NGA SPOONACULAR
// merre këtu: https://spoonacular.com/food-api
const SPOONACULAR_API_KEY = "c56c31ae0b064a06890b659c1173d891";

const BASE_URL = "https://api.spoonacular.com";

/**
 * FUNKSION I PËRBASHKËT PËR GET KËRKESA
 */
async function apiGet(path, params = {}) {
  const url = new URL(BASE_URL + path);

  Object.entries({
    apiKey: SPOONACULAR_API_KEY,
    ...params,
  }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log("❌ Spoonacular error:", res.status, text);
    throw new Error(`Spoonacular error ${res.status}`);
  }

  return res.json();
}

/**
 * Merr detajet e një recete (foto, përbërës, hapa, kalori...)
 */
export async function getRecipeDetails(recipeId) {
  if (!recipeId) throw new Error("recipeId mungon");

  const data = await apiGet(`/recipes/${recipeId}/information`, {
    includeNutrition: true,
  });

  return data;
}

/**
 * 🔹 RECETA E DITËS
 *
 * - merr ~30 receta "healthy"
 * - zgjedh njërën bazuar në datën e sotme
 * - për me qenë E NJEJTË për krejt ditën dhe me ndrru nesër
 */
export async function getRecipeOfDay() {
  // p.sh. query "healthy", mundesh me ndrru në "healthy salad", "fitness" etj.
  const search = await apiGet("/recipes/complexSearch", {
    query: "healthy",
    number: 30,
    addRecipeInformation: false,
    instructionsRequired: true,
  });

  const list = search.results || [];
  if (!list.length) {
    // fallback në "salad" nëse s’ka healthy
    const fallback = await apiGet("/recipes/complexSearch", {
      query: "salad",
      number: 30,
      addRecipeInformation: false,
      instructionsRequired: true,
    });
    if (!fallback.results || !fallback.results.length) return null;
    return getRecipeDetails(fallback.results[0].id);
  }

  // zgjedh index bazuar në datë → recetë e njëjtë gjithë ditën
  const today = new Date();
  const idx = today.getDate() % list.length;
  const chosen = list[idx];

  return getRecipeDetails(chosen.id);
}

/**
 * 🔍 SEARCH RECETE ME DETEJE
 *
 * - shkruan: "salad", "pasta", "chicken"
 * - kthen recetën e parë me detaje (foto, përbërës, hapa)
 */
export async function searchRecipeWithDetails(query) {
  if (!query || !query.trim()) return null;

  const search = await apiGet("/recipes/complexSearch", {
    query: query.trim(),
    number: 10,
    addRecipeInformation: false,
    instructionsRequired: true,
  });

  const list = search.results || [];
  if (!list.length) return null;

  // merr recetën e parë (mundesh me bo random nëse don)
  const first = list[0];

  return getRecipeDetails(first.id);
}
