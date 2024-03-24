import icons from '../img/icons.svg';
import { searchErrMsg } from '../constants';
const searchResults = document.querySelector('.results');
const searchBox = document.querySelector('.search__field');

export function searchResultDisplay(results) {
  if (results.length === 0) {
    const errDiv = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${searchErrMsg}</p>
  </div>`;
    searchResults.innerHTML = '';
    searchResults.insertAdjacentHTML('afterbegin', errDiv);
  } else {
    const displayItem = results
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
            
          </div>
        </a>
      </li>`;
      })
      .join('');
    searchResults.innerHTML = '';
    searchResults.insertAdjacentHTML('afterbegin', displayItem);
  }

  searchBox.value = '';
}
