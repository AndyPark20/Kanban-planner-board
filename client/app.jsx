import React, { useState, useEffect } from 'react';
import Home from './home';
import ParseRoute from '../client/component/library/parse-route';
import LogIn from './login';
import SignUp from './sign-up';

const App = () => {
  const [currentUrl, updateCurrentUrl] = useState('');

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const changedHash = window.location.hash;
      const parsed = ParseRoute(changedHash);
      updateCurrentUrl(parsed.path);
    });
  });

  const renderPage = () => {
    if (currentUrl === 'Home') {
      return <Home />;
    }
    if (currentUrl === '') {
      // return <Home />;
      return <LogIn />;
    }
    if (currentUrl === 'signup') {
      return <SignUp />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default App;
