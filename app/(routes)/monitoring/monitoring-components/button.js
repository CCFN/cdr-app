import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, type }) => {
    return (
      <div className='text-center'>
        <button className="btn btn-danger" onClick={onClick} type='type'>{text}</button>
      </div>
    );
  };
  
  Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  
  export default Button;
