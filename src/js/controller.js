import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import state, {
  addNewRecipe,
  getRecipe,
  removeBookmark,
  retrieveBookmarks,
  searchResult,
} from '../model';
import { renderRecipe } from '../views/recipeView';
import { spinner } from '../views/spinner';
import { renderError } from '../views/spinner';
import { addHandlerRender } from '../views/recipeView';
import { searchResult } from '../model';
import { resetPageNumber, searchResultDisplay } from '../views/searchResults';
import { addBookmark } from '../model';
import { bookmarkDisplay } from '../views/bookmark';
import {
  addRecipeHandler,
  loadingHandler,
  recipeWindow,
  sucessMessage,
  uploadRecipe,
} from '../views/addRecipe';

const recipeContainer = document.querySelector('.recipe');
const searchContainer = document.querySelector('.search');
const searchBox = document.querySelector('.search__field');
const searchResults = document.querySelector('.results');
const form = document.querySelector('.upload');
const loadingModal = document.querySelector('.loading__modal');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    spinner(recipeContainer);
    await getRecipe(id);
    const { recipe } = state;

    renderRecipe(recipe);
  } catch (err) {
    //alert(err);
    console.log(err);

    renderError();
  }
}
async function searchDataResult(searchKey) {
  try {
    await searchResult(searchKey);
  } catch (err) {
    console.log(err);
  }
}

searchContainer.addEventListener('submit', async e => {
  e.preventDefault();
  spinner(searchResults);
  await searchDataResult(searchBox.value);
  resetPageNumber();
  searchResultDisplay(state.search.results);
});

export function bookmarkController(recipe) {
  if (recipe.bookMark === true) {
    removeBookmark(recipe);
    recipe.bookMark = false;
    renderRecipe(recipe);
    bookmarkDisplay(state.bookmarks);
  } else {
    addBookmark(recipe);
    recipe.bookMark = true;
    renderRecipe(recipe);
    bookmarkDisplay(state.bookmarks);
  }
}
function init() {
  addHandlerRender(showRecipe);
  retrieveBookmarks();
  bookmarkDisplay(state.bookmarks);
  console.log(state.bookmarks, 'kkkk');
}
init();
addRecipeHandler();
export async function addNewRecipeController(newRecipe) {
  recipeWindow();
  loadingHandler();
  spinner(loadingModal);

  await addNewRecipe(newRecipe);
  // console.log(state, 'subina');
  sucessMessage();

  bookmarkDisplay(state.bookmarks);
  renderRecipe(state.recipe);
  window.history.pushState(null, '', `#${state.recipe.id}`);
  // window.history.back();
}
