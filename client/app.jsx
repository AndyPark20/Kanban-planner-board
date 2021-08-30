import React, { useState, useEffect } from 'react';
import Home from './home';
import ParseRoute from '../client/component/library/parse-route';
import LogIn from './login';
import SignUp from './sign-up';

const App = () => {
  const [currentUrl, updateCurrentUrl] = useState('');
  const [logout, updateLogout] = useState(null);

  useEffect(() => {

    window.addEventListener('hashchange', () => {
      const changedHash = window.location.hash;
      const parsed = ParseRoute(changedHash);
      updateCurrentUrl(parsed.path);
    });
  });

  useEffect(() => {
    // get token from localstorage drive
    const token = localStorage.getItem('token');
    // const parsedToken = JSON.parse(token);

    // send a post method to verify token
    const verifyToken = async () => {

      const backendTokenVerify = await fetch('/api/verifyToken', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ token: token })
      });

      const result = await backendTokenVerify.json();

      // if result is authorzed, then change location hash to Home
      if (result === 'Authorized!') {
        location.hash = 'Home';
        updateCurrentUrl('Home');
      }
      if (result === 'crediential error') {
        location.hash = '';
        updateCurrentUrl('');
      }

    };
    verifyToken();
  }, []);

  const renderPage = () => {
    if (currentUrl === 'Home') {
      return <Home updateLogout={updateLogout}/>;
    }
    if (currentUrl === '') {
      // return <Home />;
      return <LogIn logout={logout}/>;
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
