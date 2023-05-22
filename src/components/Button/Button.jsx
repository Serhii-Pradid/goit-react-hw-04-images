import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({onLoadMore}) => (
    <div className="BtnContainer">
    <button className="Button" onClick={onLoadMore}>Load more</button>
    
    </div>
)

Button.propTypes = {
    onLoadMore: PropTypes.func
}
