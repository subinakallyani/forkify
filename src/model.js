import { API_URL, KEY } from './js/config.js';
import { getJSON } from './js/helpers.js';
import { bookmarkDisplay } from './views/bookmark.js';
import { sendJSON } from './js/helpers.js';
export default state = {
  recipe: {},
  search: {
    searchReq: '',
    results: [],
  },
  bookmarks: [],
};
function formatAPIResponse(recipe) {
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
  return recipe;
}

export async function getRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { recipe } = data.data;

    state.recipe = formatAPIResponse(recipe);
    console.log(recipe, 'subina');

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
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
export function removeBookmark(recipe) {
  state.bookmarks = state.bookmarks.filter(
    bookmark => bookmark.id !== recipe.id
  );
  localStorage.setItem('bookmarks', state.bookmarks);
}
export function retrieveBookmarks() {
  const bookmark = localStorage.getItem('bookmarks');
  state.bookmarks = JSON.parse(bookmark) || [];
}
export async function addNewRecipe(newRecipe) {
  const newIngredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const [quantity, unit, discription] = ing[1]
        .replaceAll(' ', '')
        .split(',');
      return { quantity: quantity ? +quantity : null, unit, discription };
    });
  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    newIngredients,
  };
  const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);

  const formattedRecipe = formatAPIResponse(data.data.recipe);
  formattedRecipe.bookMark = true;
  state.recipe = formattedRecipe;
  addBookmark(formattedRecipe);
  console.log(state, 'bbbb');

  // });
}
