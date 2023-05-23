//import React, {Component, useState} from "react";

import React, {useState, useEffect} from 'react'
import {ToastContainer} from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';

import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';

import { fetchImage } from "./Api/api";
import { toast } from "react-toastify";


export const App = () => {
const [searchQuery, setSearchQuery] = useState('');
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
const [images, setImages] = useState([]);
const [loadMore, setLoadMore] = useState(false);
const [error, setError] = useState(null);
const [showModal, setShowmodal] = useState(false);
const [largeImageURL, setLargeImageURL] = useState('largeImageURL');
const per_page = 12;


useEffect(() => {
  
    getImages(searchQuery, page);
    console.log(searchQuery)
   }, [searchQuery, page]);

   const getImages = async (searchQuery, page) => {
 
 if (!searchQuery) {
   return;
 }    

setLoading(!loading);
 
   try {
      const { hits, totalHits } = await fetchImage(searchQuery, page);
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
     
     setImages(prevImages => [...prevImages, ...hits]);
     setLoadMore(page < Math.ceil(totalHits / per_page));
   
 } catch (errors) {                          
   setError({error}); 
 } finally {
  setLoading(loading);
 }
};
  
const handleSearchSubmit = searchQuery => {
  //console.log(searchQuery)
  setSearchQuery(searchQuery);
  setImages([]);
  setPage(1);
  setLoadMore(false)
};

const onLoadMore = () => {
  setPage(prevPage => (prevPage + 1));
  }

  const openModal = largeImageURL => {
    setShowmodal(!showModal);
    setLargeImageURL(largeImageURL)
       };
    
  const closeModal = () => {
    setShowmodal(!showModal);
    };

return (

  <section>

  <Searchbar onSearchSubmit={handleSearchSubmit}/>

  <ToastContainer autoClose={2000}/>

  {loading && <Loader /> } 

  <ImageGallery images={images} openModal={openModal} />

  {loadMore && <Button onLoadMore={onLoadMore} />} 

  {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
  
  </section>
)
}
