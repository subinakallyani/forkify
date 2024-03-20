import icons from '../img/icons.svg';
export function spinner(spinnerContainer) {
  const spin = ` <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
  spinnerContainer.innerHTML = '';
  spinnerContainer.insertAdjacentHTML('afterbegin', spin);
}
export function renderError(message) {
  const error = `
  <div class="error">;
  <div>
  <svg>
    <use href="${icons}#icon-alert-triangle"></use>
  </svg>
</div>
<p>${message}</p>
</div>`;
}
