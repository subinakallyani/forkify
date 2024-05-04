import icons from '../img/icons.svg';
import { searchErrMsg } from '../constants';
const searchResults = document.querySelector('.results');
const searchBox = document.querySelector('.search__field');
const nextBtn = document.querySelector('.pagination__btn--next');
const previousBtn = document.querySelector('.pagination__btn--prev');
let arrLength = 0;
let pageNumber = 0;
let pageOffset = 10;
let numberOfPages = 0;
export function resetPageNumber() {
  pageNumber = 0;
}
export function searchResultDisplay(results) {
  let displayItem = '';
  arrLength = results.length;
  numberOfPages = Math.ceil(arrLength / pageOffset);

  buttonStateHandler();

  if (results.length === 0) {
    displayItem = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${searchErrMsg}</p>
  </div>`;
  } else {
    let startIndex = pageNumber * pageOffset;
    let endIndex = startIndex + pageOffset;

    displayItem = results
      .slice(startIndex, endIndex)
      .map(item => {
        return ` 
<li class="preview">
        <a class="preview__link" href="#${item.id}">
          <figure class="preview__fig">
            <img src="${item.image}" alt="${item.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${item.title}</h4>
            <p class="preview__publisher">${item.publisher}</p>
            <div class="recipe__user-generated ${item.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
            </div>
          </div>
        </a>
      </li>`;
      })
      .join('');
  }
  searchResults.innerHTML = '';
  searchResults.insertAdjacentHTML('afterbegin', displayItem);

  searchBox.value = '';
}

nextBtn.addEventListener('click', nextButtonHandler);
previousBtn.addEventListener('click', previousButtonHandler);

function nextButtonHandler() {
  pageNumber = pageNumber + 1;

  buttonStateHandler();

  searchResultDisplay(state.search.results);
}
function previousButtonHandler() {
  pageNumber = pageNumber - 1;
  buttonStateHandler();

  searchResultDisplay(state.search.results);
}
function buttonStateHandler() {
  previousBtn.querySelector('.page-number').innerHTML = `Page ${pageNumber}`;
  nextBtn.querySelector('.page-number').innerHTML = `Page ${pageNumber + 2}`;
  //previousBtn.disabled = pageNumber === 0 ? true : false;
  if (pageNumber === 0) {
    nextBtn.classList.remove('invisible');
    previousBtn.classList.add('invisible');
  } else {
    previousBtn.classList.remove('invisible');
  }
  if (pageNumber === numberOfPages - 1) {
    nextBtn.classList.add('invisible');
  } else {
    nextBtn.classList.remove('invisible');
  }
}
