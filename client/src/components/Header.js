import React from 'react';
import { Link }  from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { Header } from 'semantic-ui-react'

const HeaderContainer = () => {
  return (
    <div >
      <div className="ui secondary pointing menu" >
        <Link to="/" className="item" style={{ marginLeft: '10px', fontSize: '16px', fontFamily: 'verdana'}}>
          R6Streams
        </Link>
        <div className="right menu" style={{ marginRight: '10px'}}>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;