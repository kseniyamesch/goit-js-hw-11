import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from "./api-service";

import { galleryMarkup } from "./markup";
import {clearMarkup} from "./markup";

const formRef = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


loadMoreBtn.classList.add('is-hidden');



const newsApiService = new NewsApiService();
formRef.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);



function onFormSubmit (evt) {
    evt.preventDefault();
    clearMarkup(gallery);
    loadMoreBtn.classList.add('is-hidden');

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

        let galleryLightBox = new SimpleLightbox('.gallery a', {
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
            nav: true,
        });

        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMoreBtn.classList.remove('is-hidden');
        evt.target.reset();
        if (data.totalHits < 40) {
            loadMoreBtn.classList.add('is-hidden');
            // Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        }
    }) 
    
}

function onLoadMore () {
    newsApiService.getImage().then(data => {
        galleryMarkup(gallery, data.hits);
        if (data.totalHits < 40) {
            loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        }
    });
    galleryLightBox.refresh();
    
}
