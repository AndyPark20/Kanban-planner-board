import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const HomeEntry = () => {

  const next = () => {
    console.log('next Triggered');
    location.hash = 'Home';
  };

  return (
    <div>
      <h1>Hello</h1>
      <input className="test" type="button" onClick={next}></input>
    </div>
  );
};

export default HomeEntry;
