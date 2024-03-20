import { API_URL } from './js/config.js';
import { getJSON } from './js/helpers.js';

export default state = {
  recipe: {},
};

export async function getRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    // const res = await fetch(`${API_URL}/${id}`);
    // //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    // //console.log(res);
    // const data = await res.json();
    // if (!res.ok) {
    //   throw new Error(`${data.message} (${res.status})`);
    // }
    //console.log(res, data);

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
  } catch (err) {
    console.log(err);
  }
}
