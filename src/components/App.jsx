import React, {Component} from "react";
import {ToastContainer} from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';

import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';

import { fetchImage } from "./Api/api";
import { toast } from "react-toastify";

export class App extends Component {

  state = {
    searchQuery: '',
    page: 1,
    loading: false,
    images: [],
    per_page: 12,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    status: 'idle'
      }

  handleSearchSubmit = searchQuery => {
    //console.log(searchQuery)
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    
    if(prevState.searchQuery !== searchQuery || prevState.page !== page) {
       this.getImages(searchQuery, page)
       console.log(searchQuery)
      }
  };

  getImages = async (query, page) => {
    this.setState({ loading: true });
    if (!query) {
      return;
    }    
      try {
      const { hits, totalHits } = await fetchImage(query, page);
      console.log(hits, totalHits);

      if (hits.length === 0) {
        toast.warning( 'Sorry, there are no images matching your search query. Please try again', {
          position: "top-center",
          theme: "colored",
        })
          }
        
      if (hits.length !== 0 && page === 1) {
        toast.success(`Hooray!!! We found ${totalHits} images`, {
          position: "top-left",
          theme: "colored",
        })
          }
        
        this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {                          // приймає меседж
      this.setState({ error: error});          // створюємо новий об"єкт
    } finally {
      this.setState({ loading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
    };

    openModal = largeImageURL => {
this.setState({showModal: true, largeImageURL: largeImageURL})
   };

   closeModal = () => {
    this.setState({showModal: false}) 
       };

  render() {
    
    const {loading, loadMore, images, showModal, largeImageURL} = this.state;

  return (
    <section>

    <Searchbar onSearchSubmit={this.handleSearchSubmit}/>

    <ToastContainer autoClose={2000}/>

    {loading && <Loader /> }  

     <ImageGallery images={images} openModal={this.openModal}/>
    
    {loadMore && <Button onLoadMore={this.onLoadMore} />} 
    
   {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />}

    </section>
    
          
  );
};
}