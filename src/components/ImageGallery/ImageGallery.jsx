import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from 'prop-types';
import "./ImageGallery.css";

export const ImageGallery = ({images, openModal}) => (

    <ul className="ImageGallery">
        {images.map(({id, webformatURL, largeImageURL}) => (
                <ImageGalleryItem 
                key={id}
                src={webformatURL}
                largeImageURL={largeImageURL}
                openModal={openModal} />
        
        ))}
    </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.array,
  id: PropTypes.number,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
}