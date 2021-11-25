import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
const galleryImages = createGalleryItems(galleryItems);

function createGalleryItems(array) {
  return array
    .map(
      ({ preview, original, description }) =>
        `<a class="gallery__item" style='display: inline-block; height: 240px' href=${original}>
  <img class="gallery__image" src=${preview} alt="${description}" />
</a>`,
    )
    .join('');
}

gallery.insertAdjacentHTML('beforeend', galleryImages);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});