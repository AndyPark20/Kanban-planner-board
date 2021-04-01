import React, { useState, useEffect } from 'react';
import Column from './component/column';
import Navigation from './options';
import Background from './component/library/backgroundOption';
import Modal from './component/modalList';

const App = () => {
  const [hamburger, hamburgerUpdate] = useState(false);
  const [naviOption, naviOptionUpdate] = useState('');
  const [modalStatus, modalStatusUpdate] = useState(false);
  const [wallpaper, wallpaperUpdate] = useState([]);
  const [userWallpaper, userWallPaperUpdate] = useState('https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg');
  const [modal, updateModal] = useState(false);
  const [columnNumberMaster, updateColumnNumberMaster] = useState(0);
  const [cardNumberMaster, updateCardNumberMaster] = useState(0);
  const [masterCharacter, updateMasterCharacter] = useState([]);

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

  const chosenWallpaper = index => {
    const selectedPicture = wallpaper[index].src.original;
    userWallPaperUpdate(selectedPicture);

  };

  const userSearch = (e, keyWord) => {
    if (e.target.className === 'btn btn-primary btnSize mr-1') {
      fetch(`/api/picture/${keyWord}/${'landscape'}/${'medium'}`)
        .then(res => res.json())
        .then(result => {
          const splitData = result.photos;
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
      backgroundImage: `url(${userWallpaper}?auto=compress&cs=tinysrgb&fit=crop&h=1440&w=2500)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      overflow: 'hidden',
      height: '100vh'
    }} className="cursorMain" onClick={e => change(e)}>
      <div className="columnCustom">
        <div>
          <Background status={modalStatus} searchValue={userSearch} pictures={wallpaper} modalUpdateParent={modalCancelFunction} userSelect={chosenWallpaper}/>
        </div>
        <div>
          <Modal modal={modal} columnNumber={columnNumberMaster} cardNumber={cardNumberMaster} masterCharacter={masterCharacter} updateMasterCharacter={updateMasterCharacter}/>
        </div>
        <div className="hamburgerStyle">
          <Navigation values={hamburger} class={naviOption} modalUpdate={modalChange} />
        </div>
        <Column updateModal={updateModal} updateCardNumberMaster={updateCardNumberMaster} updateColumnNumberMaster={updateColumnNumberMaster} updateMasterCharacter={updateMasterCharacter}/>
      </div>
    </div>
  );
};

export default App;
