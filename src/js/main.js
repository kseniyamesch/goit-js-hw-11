import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from "./api-service";

import { galleryMarkup } from "./markup";

const formRef = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const newsApiService = new NewsApiService();
formRef.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

// let userInput = ''

function onFormSubmit (evt) {
    evt.preventDefault();
    // userInput = evt.currentTarget.elements[0].value.trim();

    // const BASE_URL = 'https://pixabay.com/api/';
    // const options = `?key=26835433-5e813848e8d233e22f218db79&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true`;
    // const pagination = `page=1&per_page=40`
    // const axios = require('axios');
    
    let galleryLightBox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
    });
    newsApiService.query = evt.currentTarget.elements[0].value.trim();

    if (newsApiService.query === "") {
        Notiflix.Notify.failure('Please, enter a key-word');
        return
    }
    newsApiService.resetPage();
    newsApiService.getImage().then(data => {
        if (data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        galleryMarkup(gallery, data.hits);

        Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
    })
        
//     async function getImage() {
//         if (userInput !== "")
//         try {
//           const response = await axios.get(`${BASE_URL}${options}&${pagination}`);
//           const totalHits = response.data.totalHits;
//           if (totalHits === 0) {
//             Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//             return;
//           }
//           Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        
//           const data = response.data.hits;
//           galleryMarkup(gallery, data);
          
//           return data;
           
//         } catch (error) {
//           console.error(error);
//         }
//       }
// getImage();   
}

function onLoadMore () {
    newsApiService.getImage().then(data => galleryMarkup(gallery, data.hits));;
}