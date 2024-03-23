import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import state, { getRecipe, searchResult } from '../model';
import { renderRecipe } from '../views/recipeView';
import { spinner } from '../views/spinner';
import { renderError } from '../views/spinner';
import { addHandlerRender } from '../views/recipeView';
import { searchResult } from '../model';
import { searchResultDisplay } from '../views/results';

// console.log(icons, 'tested');

const recipeContainer = document.querySelector('.recipe');
const searchContainer = document.querySelector('.search');
const searchBox = document.querySelector('.search__field');
const searchResults = document.querySelector('.results');

//const searchButton = document.querySelector('.search__btn');
// searchBox.value = 'ssss';
// console.log('aaaa', searchBox.value);

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// function generateIng(recipe) {
//   const ing = recipe.ingredients
//     .map(ing => {
//       console.log(ing);
//       return `
//   <li class="recipe__ingredient">
//   <svg class="recipe__icon">
//     <use href="${icons}#icon-check"></use>
//   </svg>
//   <div class="recipe__quantity">${ing.quantity || 0}</div>
//   <div class="recipe__description">
//     <span class="recipe__unit">${ing.unit}</span>
//    ${ing.description}
//   </div>
// </li>`;
//     })
//     .join('');
//   return ing;
// }

// function spinner(spinnerContainer) {
//   const spin = ` <div class="spinner">
//     <svg>
//       <use href="${icons}#icon-loader"></use>
//     </svg>
//   </div>`;
//   spinnerContainer.innerHTML = '';
//   spinnerContainer.insertAdjacentHTML('afterbegin', spin);
// }
async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    spinner(recipeContainer);
    await getRecipe(id);
    const { recipe } = state;
    //console.log(recipe, 'text', state);
    renderRecipe(recipe);

    // const res = await fetch(
    //   `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    // );
    // //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
    // //console.log(res);
    // const data = await res.json();
    // if (!res.ok) {
    //   throw new Error(`${data.message} (${res.status})`);
    // }
    // console.log(res, data);

    // let { recipe } = data.data;
    // recipe = {
    //   cookingTime: recipe.cooking_time,
    //   id: recipe.id,
    //   image: recipe.image_url,
    //   ingredients: recipe.ingredients,
    //   publisher: recipe.publisher,
    //   servings: recipe.servings,
    //   sourceUrl: recipe.source_url,
    //   title: recipe.title,
    // };
    //console.log(recipe);

    // const html = `
    //       <figure class="recipe__fig">
    //       <img src="${recipe.image}" alt="${
    //   recipe.title
    // }" class="recipe__img" />
    //       <h1 class="recipe__title">
    //         <span>${recipe.title}</span>
    //       </h1>
    //     </figure>

    //     <div class="recipe__details">
    //       <div class="recipe__info">
    //         <svg class="recipe__info-icon">
    //           <use href="${icons}#icon-clock"></use>
    //         </svg>
    //         <span class="recipe__info-data recipe__info-data--minutes">${
    //           recipe.cookingTime
    //         }</span>
    //         <span class="recipe__info-text">minutes</span>
    //       </div>
    //       <div class="recipe__info">
    //         <svg class="recipe__info-icon">
    //           <use href="${icons}#icon-users"></use>
    //         </svg>
    //         <span class="recipe__info-data recipe__info-data--people">${
    //           recipe.servings
    //         }</span>
    //         <span class="recipe__info-text">servings</span>

    //         <div class="recipe__info-buttons">
    //           <button class="btn--tiny btn--increase-servings">
    //             <svg>
    //               <use href="${icons}#icon-minus-circle"></use>
    //             </svg>
    //           </button>
    //           <button class="btn--tiny btn--increase-servings">
    //             <svg>
    //               <use href="${icons}#icon-plus-circle"></use>
    //             </svg>
    //           </button>
    //         </div>
    //       </div>

    //       <div class="recipe__user-generated">
    //         <svg>
    //           <use href="${icons}#icon-user"></use>
    //         </svg>
    //       </div>
    //       <button class="btn--round">
    //         <svg class="">
    //           <use href="${icons}#icon-bookmark-fill"></use>
    //         </svg>
    //       </button>
    //     </div>

    //     <div class="recipe__ingredients">
    //       <h2 class="heading--2">Recipe ingredients</h2>
    //       <ul class="recipe__ingredient-list">
    //       ${recipe.ingredients
    //         .map(ing => {
    //           //console.log(ing);
    //           return `
    //           <li class="recipe__ingredient">
    //           <svg class="recipe__icon">
    //             <use href="${icons}#icon-check"></use>
    //           </svg>
    //           <div class="recipe__quantity">${ing.quantity || 0}</div>
    //           <div class="recipe__description">
    //             <span class="recipe__unit">${ing.unit}</span>
    //            ${ing.description}
    //           </div>
    //         </li>
    //         `;
    //         })
    //         .join('')};

    //       </ul>
    //     </div>

    //     <div class="recipe__directions">
    //       <h2 class="heading--2">How to cook it</h2>
    //       <p class="recipe__directions-text">
    //         This recipe was carefully designed and tested by
    //         <span class="recipe__publisher">${
    //           recipe.publisher
    //         }</span>. Please check out
    //         directions at their website.
    //       </p>
    //       <a
    //         class="btn--small recipe__btn"
    //         href="${recipe.sourceUrl}"
    //         target="_blank"
    //       >
    //         <span>Directions</span>
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-right"></use>
    //         </svg>
    //       </a>
    //     </div>`;
    // recipeContainer.innerHTML = '';
    // recipeContainer.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    //alert(err);
    console.log(err);

    renderError();
  }
}
async function searchDataResult(searchKey) {
  try {
    await searchResult(searchKey);
    //console.log(state.search.results, 'asd');
  } catch (err) {
    console.log(err);
  }
}

searchContainer.addEventListener('submit', async e => {
  e.preventDefault();
  spinner(searchResults);
  await searchDataResult(searchBox.value);
  console.log(e, 'sdf', state.search.results);
  searchResultDisplay(state.search.results);

  // const searchResult = state.search.results
  //   .map(item => {
  //     console.log(item, 'hhhh');
  //     return `
  //   <li class="preview">
  //           <a class="preview__link preview__link--active" href="#${item.id}">
  //             <figure class="preview__fig">
  //               <img src="${item.image}" alt="Test" />
  //             </figure>
  //             <div class="preview__data">
  //               <h4 class="preview__title">${item.title} ...</h4>
  //               <p class="preview__publisher">${item.publisher}</p>
  //               <div class="preview__user-generated">
  //                 <svg>
  //                   <use href="${icons}.svg#icon-user"></use>
  //                 </svg>
  //               </div>
  //             </div>
  //           </a>
  //         </li>`;
  //   })
  //   .join('');
  // //console.log(searchResult);
  // searchResults.innerHTML = '';
  // searchResults.insertAdjacentHTML('afterbegin', searchResult);
  // searchBox.value = '';
});

// searchButton.addEventListener('click', async () => {
//   await searchDataResult(searchBox.value);
// state.search.results.map(items => {
//   console.log(items, 'hhhh');
// });

//   console.log(searchBox.value, 'subina', state.search.results);
// });

//['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
addHandlerRender(showRecipe);
//window.addEventListener('hashchange', showRecipe);
//window.addEventListener('load', showRecipe);
