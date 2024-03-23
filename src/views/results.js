import icons from '../img/icons.svg';
const searchResults = document.querySelector('.results');
const searchBox = document.querySelector('.search__field');
export function searchResultDisplay() {
  const displayItem = state.search.results
    .map(item => {
      console.log(item, 'hhhh');
      return ` 
<li class="preview">
        <a class="preview__link preview__link--active" href="#${item.id}">
          <figure class="preview__fig">
            <img src="${item.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${item.title} ...</h4>
            <p class="preview__publisher">${item.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
    })
    .join('');
  searchResults.innerHTML = '';
  searchResults.insertAdjacentHTML('afterbegin', displayItem);
}
//console.log(searchResult);

searchBox.value = '';
