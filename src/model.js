import { API_URL } from './js/config.js';
import { getJSON } from './js/helpers.js';

export default state = {
  recipe: {},
  search: {
    searchReq: '',
    results: [],
  },
  bookmarks: [],
};

export async function getRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;
    recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    state.recipe = recipe;
    state.bookmarks.forEach(items => {
      if (items.id === state.recipe.id) {
        state.recipe.bookMark = true;
      }
    });
  } catch (err) {
    throw err;
  }
}
export async function searchResult(search) {
  try {
    state.search.searchReq = search;
    const searchData = await getJSON(`${API_URL}?search=${search}`);

    state.search.results = searchData.data.recipes.map(ing => {
      return {
        id: ing.id,
        image: ing.image_url,
        publisher: ing.publisher,
        title: ing.title,
      };
    });
  } catch (err) {
    throw err;
  }
}
export function addBookmark(recipe) {
  state.bookmarks.push(recipe);

  console.log(state.bookmarks, 'kkk');
}
export function removeBookmark(recipe) {
  state.bookmarks = state.bookmarks.filter(
    bookmark => bookmark.id !== recipe.id
  );
  console.log('removed', state.bookmarks);
}
