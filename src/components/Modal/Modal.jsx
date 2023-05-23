import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');


export const Modal = ({onClose, largeImageURL}) => {

    
    
    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            console.log('нужно срочно закрыть модалку')
            onClose();
        }
    }

    useEffect(() => {
        const handleKeyDown = e => {
        if (e.code === 'Escape') {
            console.log('нужно закрыть модалку')
            onClose();
        }
    };
        window.addEventListener('keydown', handleKeyDown)
        return() => {
               window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])
    


  return createPortal (

        <div className="Overlay" onClick={handleBackdropClick} >
          <div className="Modal" >
          <img src={largeImageURL} alt="" />
          </div>
        </div>,
        modalRoot
        )  
  
}

Modal.propTypes = {
    onClose: PropTypes.func,
    largeImageURL: PropTypes.string.isRequired,
  };