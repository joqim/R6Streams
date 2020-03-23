import React from 'react';
import { Link }  from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div>
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          R6Streams
        </Link>
        <div className="right menu">
          <Link to="/" className="item">
            View Streams
          </Link>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;