import React, { useState, useEffect } from 'react';
import Home from './home';
import ParseRoute from '../client/component/library/parse-route'
import { hash } from 'argon2';
import TestIt from './testIt'


const  App = ()=> {
  const [currentUrl, updateCurrentUrl] = useState('');

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const changedHash = window.location.hash;
      const parsed = ParseRoute(changedHash);
      updateCurrenUrl(parsed);
    })
  })

  const renderPage =()=>{
    if(currentUrl.path ==='Home'){
      <Home />
    }
    if(currentUrl.path ==='Login'){
      <TestIt />
    }
  }

  return (
    <div>

    </div>
  )
}


export default App;
