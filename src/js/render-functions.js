import { cardContainer } from '../main.js';
import { loadMoreBtn } from '../main.js';

export function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `
        <li class="img-card">
          <div class="img-img">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
          </div>
          <div class="img-info">
            <ul class="img-info-list">
              <li><h3>Likes</h3><p>${likes}</p></li>
              <li><h3>Views</h3><p>${views}</p></li>
              <li><h3>Comments</h3><p>${comments}</p></li>
              <li><h3>Downloads</h3><p>${downloads}</p></li>
            </ul>
          </div>
        </li>
      `
    )
    .join('');
}

/**
 * @param {HTMLElement} cardContainer - The container element to render into.
 * @param {string} markup - The HTML markup to render.
 */
export function renderMarkup(cardContainer, markup) {
  cardContainer.insertAdjacentHTML('beforeend', markup);
  loadMoreBtn.classList.replace('hidden', 'load-more-button');
}

//Clears the image cards container:
// @param {HTMLElement} cardContainer - The container element to clear.
export function clearCardContainer(cardContainer) {
  cardContainer.innerHTML = '';
}
