import React, { useState, useEffect } from 'react';
import Column from './component/column';
import Navigation from './options';
import Background from './component/library/backgroundOption';
// import Modal from './component/modalList';
import ModalRevised from './component/modalListRevised';
import ParseRoute from '../client/component/library/parse-route';
import DeleteModal from './component/library/deleteModal';
import DeleteActivity from './component/library/deleteActivity';

const Home = ({ updateLogout }) => {
  const [hamburger, hamburgerUpdate] = useState(false);
  const [naviOption, naviOptionUpdate] = useState('');
  const [modalStatus, modalStatusUpdate] = useState(false);
  const [wallpaper, wallpaperUpdate] = useState([]);
  const [userWallpaper, userWallPaperUpdate] = useState('');
  const [modal, updateModal] = useState(false);
  const [columnNumberMaster, updateColumnNumberMaster] = useState(0);
  const [cardNumberMaster, updateCardNumberMaster] = useState(null);
  const [masterCharacter, updateMasterCharacter] = useState([]);
  const [columnUpdate, updateColumnComponent] = useState(false);
  const [description, updateDescription] = useState('');
  const [renderActivity, updateRenderActivity] = useState(false);
  const [modalTitle, updateModalTitle] = useState('');
  const [descriptionForCard, updateDescriptionForCard] = useState('');

  // hide and unhide confirmation modal
  const [confirmationModal, updateConfirmationModal] = useState(true);

  // hide and unhide Activity delete confirmation modal
  const [confirmationActivityDeleteModal, updateConfirmationActivityDeleteModal] = useState(true);

  // ActivityId state for deleting activity log
  const [activityIdDelete, updateActivityIdDelete] = useState(null);

  // Existing Wallpaper Url
  const [existingWallPaperUrl, updateExistingWallPaperUrl] = useState(false);

  const characters = {
    Todo: {
      id: 'Todo',
      list: []
    },
    Doing: {
      id: 'Doing',
      list: []
    },
    Done: {
      id: 'Done',
      list: []
    }
  };

  // Retrieve card and info data when user signs in
  useEffect(() => {

    // First Check if the user is kept logged in
    const token = localStorage.getItem('token');

    const retrieveData = async () => {
      try {
        const data = await fetch('/api/retrieve');
        const result = await data.json();
        if (result) {
          // make a copy of the masterCharacter (will also be updating object from other components)
          const copiedCharacterObject = Object.assign(characters);
          // When result promise has been returned, insert the result values to the appropriate values in the character object.
          result.forEach(values => {
            const characterList = copiedCharacterObject[values.column].list;
            characterList.push(values);
            copiedCharacterObject[values.column] = { ...copiedCharacterObject[values.column], list: characterList };
          });
          // update MasterCharacter
          updateMasterCharacter(Object.values(copiedCharacterObject));
        }

      } catch (err) {
        console.error(err);
      }

    };
    retrieveData();

    // Retrieve wallpaper
    const retrieveWallPaper = async () => {
      try {
        const wallpaperData = await fetch('/api/getWallpaper');
        const result = await wallpaperData.json();
        if (result.length !== 0) {
          userWallPaperUpdate(result[0].url);
          updateExistingWallPaperUrl(true);
        } else {
          // If no wallpaper is selected or if its the users first time using the app, use this default wallpaper
          userWallPaperUpdate('https://images.pexels.com/photos/890035/pexels-photo-890035.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=1440&w=2560');
        }
      } catch (err) {
        console.error(err);
      }
    };
    retrieveWallPaper();

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
    modalStatusUpdate(!modalStatus);
  };

  const modalCancelFunction = () => {
    if (!modalStatus) {
      modalStatusUpdate(true);
    } else {
      modalStatusUpdate(false);
    }
  };

  // Save selected wallpaper into the data base
  const chosenWallpaper = async index => {
    const selectedPicture = wallpaper[index].src.original;
    try {
      const backgroundPost = await fetch('/api/wallpaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([selectedPicture, existingWallPaperUrl])
      });
      const result = await backgroundPost.json();

      // when promise has beenn returned, update the userWallPaper state
      userWallPaperUpdate(result.rows[0].url);
    } catch (err) {
      console.error(err);
    }

  };

  // For changing Background
  const userSearch = async (e, keyWord) => {
    try {
      const background = await fetch(`/api/picture/${keyWord}/${'landscape'}/${'medium'}`);
      const result = await background.json();
      if (result) {
        const splitData = result.photos;
        localStorage.setItem('wallpaper', JSON.stringify(splitData));
        const retrieveWallpaper = JSON.parse(localStorage.getItem('wallpaper'));
        wallpaperUpdate(retrieveWallpaper);
      }
    } catch (err) {
      console.error(err);
    }

  };
  // Shouldn't be any .catch
  return (
    <div style={{
      backgroundImage: `url(${userWallpaper}?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      overflow: 'hidden',
      height: '100vh'
    }} className="cursorMain" onClick={e => change(e)}>
      <div className="columnCustom">
        <div>
          <Background status={modalStatus} searchValue={userSearch} pictures={wallpaper} modalUpdateParent={modalCancelFunction} userSelect={chosenWallpaper} />
        </div>
        <div>
          <ModalRevised updateConfirmationActivityDeleteModal={updateConfirmationActivityDeleteModal} updateActivityIdDelete={updateActivityIdDelete}
            characters={characters} confirmationModal={confirmationModal} updateConfirmationModal={updateConfirmationModal}
            updateDescriptionForCard={updateDescriptionForCard} descriptionForCard={descriptionForCard} updateModalTitle={updateModalTitle}
            modalTitle={modalTitle} updateRenderActivity={updateRenderActivity} renderActivity={renderActivity} updateDescription={updateDescription}
            modal={modal} updateModal={updateModal} columnNumber={columnNumberMaster} cardNumber={cardNumberMaster}
            masterCharacter={masterCharacter} updateMasterCharacter={updateMasterCharacter}
            updateColumnComponent={updateColumnComponent} />

        </div>
        <div className="hamburgerStyle">
          <Navigation values={hamburger} class={naviOption} modalUpdate={modalChange} updateLogout={updateLogout}/>
        </div>
        <Column characters={characters} updateDescriptionForCard={updateDescriptionForCard} updateModalTitle={updateModalTitle} updateRenderActivity={updateRenderActivity} description={description} initialCharacter={characters} masterCharacter={masterCharacter} updateColumnComponent={updateColumnComponent} columnUpdate={columnUpdate} updateModal={updateModal} updateCardNumberMaster={updateCardNumberMaster} updateColumnNumberMaster={updateColumnNumberMaster} updateMasterCharacter={updateMasterCharacter} updatedCharacter={masterCharacter} />
      </div>
      <div>
        <DeleteModal characters={characters} updateModal={updateModal} updateRenderActivity={updateRenderActivity} updateMasterCharacter={updateMasterCharacter} masterCharacter={masterCharacter} confirmationModal={confirmationModal} updateConfirmationModal={updateConfirmationModal} columnNumber={columnNumberMaster} cardNumber={cardNumberMaster} />
      </div>
      <DeleteActivity updateRenderActivity={updateRenderActivity} activityIdDelete={activityIdDelete} characters={characters} updateModal={updateModal} updateMasterCharacter={updateMasterCharacter} masterCharacter={masterCharacter} columnNumber={columnNumberMaster} cardNumber={cardNumberMaster} confirmationActivityDeleteModal={confirmationActivityDeleteModal} updateConfirmationActivityDeleteModal={updateConfirmationActivityDeleteModal} />
    </div>
  );
};

export default Home;
