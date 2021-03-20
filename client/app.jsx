import React, { useState, useEffect } from 'react';
import Column from './component/column';
import Navigation from './options';

const App = () => {
  const [hamburger, hamburgerUpdate] = useState(false);

  const change = e => {
    if (!hamburger && e.target.className === 'fas fa-bars') {
      hamburgerUpdate(true);
    } else {
      hamburgerUpdate(false);
    }

  };

  return (
    <div style={{
      backgroundImage: 'url(https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1440&w=2500)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      overflow: 'hidden',
      height: '100vh'
    }} className="cursorMain" onClick={e => change(e)}>
      <div className="columnCustom">
        <div className="hamburgerStyle">
          <Navigation values={hamburger} />
        </div>
        <Column />
      </div>

    </div>
  );
};

export default App;
