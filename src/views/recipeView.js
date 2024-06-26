import icons from '../img/icons.svg';
import { Fraction } from 'fractional';
import { renderError } from './spinner';
import { addBookmark } from '../model';
import { bookmarkController } from '../js/controller';

const recipeContainer = document.querySelector('.recipe');

let servings = 0;
function initiateEventListner(recipe) {
  const btnIncrease = document.querySelector('.btn--increase-servings');
  const btnDecrease = document.querySelector('.btn--decrease-servings');
  const btnBookmark = document.querySelector('.btn--bookmark');

  btnIncrease.addEventListener('click', () => {
    btnIncreaseHandler(recipe);
  });
  btnDecrease.addEventListener('click', () => {
    btnDecreaseHandler(recipe);
  });
  btnDecrease.disabled = servings === 1 ? true : false;
  btnBookmark.addEventListener('click', () => {
    bookmarkController(recipe);
  });
}
function btnIncreaseHandler(recipe) {
  servings = servings + 1;

  newQuantity(recipe);
  recipe.servings = servings;
  renderRecipe(recipe);
}
function btnDecreaseHandler(recipe) {
  servings = servings - 1;

  newQuantity(recipe);
  recipe.servings = servings;
  renderRecipe(recipe);
}
function newQuantity(recipe) {
  recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * servings) / recipe.servings;
  });
}

export function renderRecipe(recipe) {
  servings = recipe.servings;

  const html = `
<figure class="recipe__fig">
<img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
<h1 class="recipe__title">
  <span>${recipe.title}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${
    recipe.cookingTime
  }</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${servings}</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--decrease-servings">
      <svg>
        <use href="${icons}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-generated ${recipe.key ? '' : 'hidden'}">
  <svg>
    <use href="${icons}#icon-user"></use>
  </svg>
</div>
<button class="btn--round btn--bookmark">
  <svg class="">
    <use href="${icons}#icon-bookmark${
    recipe.bookMark === true ? '-fill' : ''
  }"></use>
  </svg>
</button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${recipe.ingredients
  .map(ing => {
    return `<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
     ${ing.description}
    </div>
  </li>`;
  })
  .join('')}
  </ul>
</div>
<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
  directions at their website.
</p>
<a
  class="btn--small recipe__btn"
  href="${recipe.sourceUrl}"
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</a>
</div>`;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', html);

  initiateEventListner(recipe);
}

export function addHandlerRender(handler) {
  ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
}
