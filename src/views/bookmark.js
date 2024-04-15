import icons from '../img/icons.svg';
const bookmarkContainer = document.querySelector('.bookmarks__list');
export function bookmarkDisplay(bookmarked) {
  let bookmarkItem = '';
  if (bookmarked.length == 0) {
    bookmarkItem = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>`;
  } else {
    bookmarkItem = bookmarked
      .map(item => {
        return `<li class="preview">
    <a class="preview__link" href="#${item.id}">
      <figure class="preview__fig">
        <img src="${item.image}" alt="${item.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__name">${item.title}
        </h4>
        <p class="preview__publisher">${item.publisher}</p>
      </div>
    </a>
    </li>`;
      })
      .join('');
  }
  bookmarkContainer.innerHTML = '';
  bookmarkContainer.insertAdjacentHTML('afterbegin', bookmarkItem);
  console.log(bookmarked, 'nnnn');
}
