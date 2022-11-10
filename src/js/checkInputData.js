import createGallery from './createGallery';
import Notiflix from 'notiflix';
import updateResponce from './updateResponce';
import checkQuantityOfPages from './onSubmitSearch';

function checkInputData(responce, page) {
  const responceResult = responce.data.results;

  console.log('checkInputData responce:', responceResult);
  console.log('checkInputData page:', page);

  if (responceResult.length === 0) {
    Notiflix.Notify.warning('Sorry... the movie was not found. Try change your search');
    return;
  } else {
    updateResponce(responceResult, page);
  }
}

export default checkInputData;
