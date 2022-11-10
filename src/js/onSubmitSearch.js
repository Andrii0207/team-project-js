import { fetchSearchFilm } from './fetchAPI';
import refs from './refs';
import Notiflix from 'notiflix';
import checkInputData from './checkInputData';
import { createGallery, createGalleryNextPage } from './createGallery';
import oneMovieCard from '/src/templates/oneMovieCard.hbs';
import smoothScroll from './smoothScrool';
import { renderDefaultMovies } from './renderDefaultMovies';

import { spinnerOn, spinnerOff } from './loader';

refs.form.addEventListener('submit', onClickSubmit);
refs.loadMore.addEventListener('click', onLoadMore);
// refs.loadMore.setAttribute('hidden', 'hidden');
// console.log(refs.loadMore);

let value = null;
let page = 1;

function onClickSubmit(event) {
  event.preventDefault();
  page = 1;

  value = refs.input.value.toLowerCase().trim();

  if (!value) {
    Notiflix.Notify.failure('Please, enter something to search');
    return;
  }
  refs.loadMore.removeEventListener('click', renderDefaultMovies);
  // spinnerOn();
  fetchSearchFilm(value, page)
    .then(data => checkInputData(data, page))
    // .then(resp => console.log('responce', resp))
    .catch(error => console.log(error))
    .finally(() => spinnerOff());

  event.target.reset();
}

function onLoadMore() {
  page += 1;
  fetchSearchFilm(value, page)
    .then(data => checkQuantityOfPages(data, page))
    .catch(error => console.log(error));
  smoothScroll();
}

function checkQuantityOfPages(data, page) {
  const dataCurrentPage = data.data.page;
  const dataTotalPages = data.data.total_pages;
  console.log('checkQuantityOfPages page:', page);
  console.log('checkQuantityOfPages dataCurrentPage:', dataCurrentPage);
  console.log('checkQuantityOfPages dataTotalPages:', dataTotalPages);

  if (page == dataTotalPages) {
    // Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMore.setAttribute('hidden', 'hidden');
    // refs.loadMore.classList.add('is-hidden');
    return;
  }
  checkInputData(data, page);
}

export { onClickSubmit, checkQuantityOfPages };
