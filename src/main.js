import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  position: 'topRight',
});

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api.js';
import {
  createMarkup,
  renderMarkup,
  clearCardContainer,
} from './js/render-functions.js';

const form = document.querySelector('.js-search-form');
const qInput = document.querySelector('#query');
const loader = document.getElementById('loader');
const cardContainer = document.querySelector('.image-cards');
export { cardContainer };
const loadMoreBtn = document.querySelector('#load-more');
export { loadMoreBtn };

let query;

let page = 1;
let per_page = 15;
let scrollOffset = 300; // Default value for scrolling down

loadMoreBtn.addEventListener('click', onClickLoadMore);

const lightbox = new SimpleLightbox('.image-cards a');

form.addEventListener('submit', event => {
  event.preventDefault();
  query = qInput.value.trim();
  //page = 1; //Reset page to 1 for a new search
  if (!query) {
    iziToast.warning({
      title: 'Error',
      message: 'Please enter a searched word',
    });
    return;
  }

  //console.log('Submitted query:', query);

  // Show loader
  loader.classList.remove('disabled');
  //console.log('Loader active:', loader.classList);

  fetchImages(query, per_page, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No Results',
          message: 'No images found for your query.',
        });
        clearCardContainer(cardContainer); // Clear the cardContainer if no results
        return;
      }

      clearCardContainer(cardContainer); // Clear the cardContainer
      const markup = createMarkup(data.hits);
      renderMarkup(cardContainer, markup); // Render markup
      loadMoreBtn.classList.replace('hidden', 'load-more-button'); //LoadMore is visible
      //console.log('Updated loadMoreBtn classList:', [...loadMoreBtn.classList]);

      // Element height - bounding rectangle
      let elem = document.querySelector('.img-card'); // Card element
      if (elem) {
        let rect = elem.getBoundingClientRect();
        //console.log('Bounding Rect:', rect);
        scrollOffset = rect.height * 2; // Update the scrol-down offset
        //console.log('Scroll Offset:', scrollOffset);
      }
      lightbox.refresh(); // Refresh lightbox for new elements
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: `Failed to fetch images: ${error.message}`,
      });
    })
    .finally(() => {
      // Hide loader
      loader.classList.add('disabled');
    });
});

async function onClickLoadMore() {
  page += 1;
  //console.log('page:', page);
  try {
    const data = await fetchImages(query, per_page, page);
    let totalPages = Math.ceil(data.totalHits / per_page);
    //console.log(`totalPages = ${totalPages}`);
    if (page >= totalPages) {
      console.log("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.classList.add('hidden'); // Hide the button
      iziToast.warning({
        title: 'No more pages',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    // Append the new items to the gallery
    const markup = createMarkup(data.hits);
    renderMarkup(cardContainer, markup);
    //Scroll
    window.scrollBy({
      top: scrollOffset, // Use the updated value
      left: 0,
      behavior: 'smooth',
    });

    // Refresh the lightbox to include new images
    lightbox.refresh();
  } catch {
    console.error('Error in onClickLoadMore:', error.message);
    iziToast.error({
      title: 'Error',
      message: `Failed to load more images: ${error.message}`,
    });
  }
}
