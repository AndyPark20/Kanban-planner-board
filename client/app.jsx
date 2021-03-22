import React, { useState, useEffect } from 'react';
import Column from './component/column';
import Navigation from './options';
import Background from './component/library/backgroundOption';

const App = () => {
  const [hamburger, hamburgerUpdate] = useState(false);
  const [naviOption, naviOptionUpdate] = useState('');
  const [modalStatus, modalStatusUpdate] = useState(false);
  const [wallpaper, wallpaperUpdate] = useState([]);

  useEffect(() => {
    const retrieveWallpaper = JSON.parse(localStorage.getItem('wallpaper'));
    wallpaperUpdate(retrieveWallpaper);
  }, []);

  const change = e => {
    if (!hamburger && e.target.className === 'fas fa-bars') {
      hamburgerUpdate(true);
    }
    if (hamburger && e.target.className !== 'fas fa-bars') {
      hamburgerUpdate(false);
    }

    if (e.target.className === 'check') {
      naviOptionUpdate('check');
    } else {
      naviOptionUpdate('');
    }
  };

  const modalChange = () => {
    if (!modalStatus) {
      modalStatusUpdate(true);
    } else {
      modalStatusUpdate(false);
    }
  };

  const modalCancelFunction = () => {
    if (!modalStatus) {
      modalStatusUpdate(true);
    } else {
      modalStatusUpdate(false);
    }
  };

  const userSearch = (e, keyWord) => {
    if (e.target.className === 'btn btn-primary btnSize mr-1') {
      fetch(`/api/picture/${keyWord}/${'landscape'}/${'medium'}`)
        .then(res => res.json())
        .then(result => {
          const splitData = result.photos;
          console.log(splitData);
          localStorage.setItem('wallpaper', JSON.stringify(splitData));
          const retrieveWallpaper = JSON.parse(localStorage.getItem('wallpaper'));
          wallpaperUpdate(retrieveWallpaper);

        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <div style={{
      backgroundImage: 'url(https://images.pexels.com/photos/1183021/pexels-photo-1183021.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1440&w=2500)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      overflow: 'hidden',
      height: '100vh'
    }} className="cursorMain" onClick={e => change(e)}>
      <div className="columnCustom">
        <div>
          <Background status={modalStatus} searchValue={userSearch} pictures={wallpaper} modalUpdateParent={modalCancelFunction}/>
        </div>
        <div className="hamburgerStyle">
          <Navigation values={hamburger} class={naviOption} modalUpdate={modalChange} />
        </div>
        <Column />
      </div>

    </div>
  );
};

export default App;
