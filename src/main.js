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

// loadMoreBtn.addEventListener('click', onClickLoadMore);
// console.log('Adding click listener to loadMoreBtn');
if (!loadMoreBtn.dataset.listenerAttached) {
  console.log('Adding click listener to loadMoreBtn');
  loadMoreBtn.addEventListener('click', onClickLoadMore);
  loadMoreBtn.dataset.listenerAttached = 'true'; // Mark listener as attached
}

const lightbox = new SimpleLightbox('.image-cards a');

if (!window.__formSubmitListenerAttached) {
  form.addEventListener('submit', event => {
    //console.log('Event listener attached');
    event.preventDefault();
    query = qInput.value.trim();
    page = 1; //Reset page to 1 for a new search
    if (!query) {
      iziToast.warning({
        title: 'Error',
        message: 'Please enter a searched word',
      });
      return;
    }

    //console.log('Submitted query:', query);

    // Show loader
    console.log('Before enabling loader:', loader.classList);
    loader.classList.remove('disabled'); // Enable loader
    console.log('After enabling loader:', loader.classList);

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

        let totalPages = Math.ceil(data.totalHits / per_page);
        //Check if all imgs are on 1 page || 0 imgs, so there is no more images to display:
        if (totalPages <= page) {
          loadMoreBtn.classList.add('hidden'); // Hide the button
          loader.classList.add('disabled'); // Hide loader

          iziToast.warning({
            title: 'No more pages',
            message:
              "We're sorry, but you've reached the end of search results.",
          });
          return;
        }

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
        console.log('loader disabled:', loader.classList);
      });
  });

  window.__formSubmitListenerAttached = true;
}

async function onClickLoadMore() {
  page += 1;
  //console.log('page:', page);
  try {
    const data = await fetchImages(query, per_page, page);

    //console.log('Before enabling loader:', loader.classList);
    loader.classList.remove('disabled'); // Remove the disabled class
    //loader.style.display = 'block'; // Explicitly make it visible

    //await new Promise(resolve => setTimeout(resolve, 1500)); // Delay for visibility
    //console.log(`Loaded ${data.hits.length} images`);
    //console.log('After enabling loader:', loader.classList);

    // Append the new items to the gallery
    const markup = createMarkup(data.hits);
    renderMarkup(cardContainer, markup);
    loader.classList.add('disabled'); // Hide loader
    //console.log('After disabling loader:', loader.classList);
    //Scroll
    window.scrollBy({
      top: scrollOffset, // Use the updated value
      left: 0,
      behavior: 'smooth',
    });

    let totalPages = Math.ceil(data.totalHits / per_page);
    //console.log(`totalPages = ${totalPages}`);
    if (page >= totalPages) {
      // console.log("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.classList.add('hidden'); // Hide the button
      loader.classList.add('disabled'); // Hide loader
      iziToast.warning({
        title: 'No more pages',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }
    // Refresh the lightbox to include new images
    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to load more images: ${error.message}`,
    });
  } finally {
    // Ensure loader is hidden on completion
    loader.classList.add('disabled');
    //console.log('Final loader state:', loader.classList);
  }
}

if (!window.__loadMoreClickListenerAttached) {
  loadMoreBtn.addEventListener('click', onClickLoadMore);
  window.__loadMoreClickListenerAttached = true;
}
