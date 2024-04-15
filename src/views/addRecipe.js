import { addNewRecipeController } from '../js/controller';
import icons from '../img/icons.svg';
import { spinner } from './spinner';

const btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
const addRecipeWindow = document.querySelector('.add-recipe-window');
const overlay = document.querySelector('.overlay');
const btnCloseWindow = document.querySelector('.btn--close-modal');
const form = document.querySelector('.upload');
const loadingModal = document.querySelector('.loading__modal');
export function recipeWindow() {
  addRecipeWindow.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
export function loadingHandler() {
  loadingModal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
function closeAddRecipe() {
  addRecipeWindow.classList.add('hidden');
  overlay.classList.add('hidden');
  loadingModal.classList.add('hidden');
}
export function addRecipeHandler() {
  btnAddRecipe.addEventListener('click', recipeWindow);
  btnCloseWindow.addEventListener('click', recipeWindow);
  overlay.addEventListener('click', closeAddRecipe);
}
function validateForm(formData) {
  const newIngredients = Object.entries(formData);
  for (let items of newIngredients) {
    if (items[0].startsWith('ingredient') && items[1] !== '') {
      const ing = items[1].replaceAll(' ', '').split(',');
      if (ing.length !== 3) {
        console.log('returned');
        return false;
      }
    }
  }
  return true;
}
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = [...new FormData(form)];
  const data = Object.fromEntries(formData);
  const isFormValid = validateForm(data);
  if (isFormValid) {
    addNewRecipeController(data);
    // recipeWindow();
  } else {
    const error = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
    Wrong ingredient fromat! Please use the correct format :)
    </p>
  </div>`;
    form.innerHTML = '';
    form.insertAdjacentHTML('afterbegin', error);
  }
});
export function sucessMessage() {
  {
    const sucess = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>
        Recipe was successfully uploaded :)
        </p>
      </div>`;
    loadingModal.innerHTML = '';
    loadingModal.insertAdjacentHTML('afterbegin', sucess);
  }
}
