import axios from "axios";
import Notiflix from "notiflix";

const formRef = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery')

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit (evt) {
    evt.preventDefault();
    const userInput = evt.currentTarget.elements[0].value;
// Сделать проверку инпута
// if (userInput = '') return;


    // Запрос на сервер с помощью библиотеки Axios на сервер Pixabay;
    const BASE_URL = 'https://pixabay.com/api/';
    const options = `?key=26835433-5e813848e8d233e22f218db79&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true`;
    const pagination = `page=1&per_page=40`
    const axios = require('axios');
    
    async function getImage() {
        try {
          const response = await axios.get(`${BASE_URL}${options}&${pagination}`);
          const totalHits = response.data.totalHits;
          if (totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
          }
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
getImage();
    // Отрисовка разметки в отдельном JS файле


    // console.dir(userInput)
    galleryMarkup(); 
}

function galleryMarkup () {

}