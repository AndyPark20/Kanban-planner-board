import React, { useState, useEffect } from 'react';
import Home from './home';
import ParseRoute from '../client/component/library/parse-route';
import LogIn from './login';
import SignUp from './sign-up';

const App = () => {
  const [currentUrl, updateCurrentUrl] = useState('');
  const [token, updateToken] = useState('');

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      const changedHash = window.location.hash;
      const parsed = ParseRoute(changedHash);
      updateCurrentUrl(parsed.path);
    });
  });

  useEffect(() => {
    // get token

    const parsedToken = localStorage.getItem('token');
    console.log(parsedToken);
    // console.log(parsedToken);
    // const verifyToken = async () => {

    //   const backendTokenVerify = await fetch('/api/verifyToken', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({})

    //   });
    // };
  }, []);

  const renderPage = () => {
    if (currentUrl === 'Home') {
      return <Home />;
    }
    if (currentUrl === '') {
      // return <Home />;
      return <LogIn/>;
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
