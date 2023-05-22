import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export const ImageGalleryItem = ({src, alt, largeImageURL, openModal}) => (
    <li className="ImageGalleryItem" onClick={() => openModal(largeImageURL)}>
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
)

ImageGalleryItem.propTypes = {
 src: PropTypes.string,
  alt: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  openModal: PropTypes.func,
}