import {useState} from "react";
import {toast} from 'react-toastify';
import { FcSearch } from "react-icons/fc";
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';


const Searchbar = ({onSearchSubmit}) => {

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
    };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please, enter the search word', {
        position: "top-center",
        theme: "colored",
      });
      return;
    }
  

    onSearchSubmit(searchQuery);
    reset();
}

   const reset = () => {
    setSearchQuery('')
 }
  
 
    return (
<header className={css.Searchbar}>

  <form onSubmit={handleSubmit} className={css.SearchForm}>
    <button type="submit" className={css.SearchFormButton}>
      <span> <FcSearch size={25} /> </span> 
    </button> 

    <input
      className={css.SearchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      name='searchQuery'
      value={searchQuery}
      onChange={handleChange}
    />
  </form>
</header>

    );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func
}

export default Searchbar;