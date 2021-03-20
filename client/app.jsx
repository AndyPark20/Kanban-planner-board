import React, { useState, useEffect } from 'react';
import Column from './component/column';

const App = () => {

  return (
    <div style={{
      backgroundImage: 'url(\'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1440&w=2500\')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto',
      height: '100vh'
    }}>
      <div className="columnCustom">
        <Column />
      </div>
    </div>
  );
};

export default App;
