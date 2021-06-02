import React, { useState, useEffect } from 'react';
import Home from './home';
import ParseRoute from '../client/component/library/parse-route';
import TestIt from './testIt'


const  App = ()=> {
  const [currentUrl, updateCurrentUrl] = useState('');

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const changedHash = window.location.hash;
      const parsed = ParseRoute(changedHash);
      updateCurrentUrl(parsed.path)
    })
  })

  const renderPage =()=>{
    if(currentUrl ==='Home'){
      return <Home />
    }
    if(currentUrl ==='Login'){
     return  <TestIt />
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  )
}


export default App;
