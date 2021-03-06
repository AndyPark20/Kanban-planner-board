
import React, { useEffect, useState } from 'react';
import Activity from './activity';

const Modal = ({ updateConfirmationActivityDeleteModal, updateActivityIdDelete, characters, updateConfirmationModal, updateDescriptionForCard, descriptionForCard, modalTitle, updateModalTitle, updateRenderActivity, renderActivity, updateDescription, modal, columnNumber, cardNumber, masterCharacter, updateMasterCharacter, updateColumnComponent, updateModal }) => {
  const [values, updateValues] = useState('');
  const [finalValues, updateFinalValues] = useState('');
  const [modalClose, updateModalClose] = useState(false);
  const [modalStatus, updateModalStatus] = useState(false);
  const [descriptionStatus, updateDescriptionStatus] = useState(true);
  const [initialDescription, updateInitialDescription] = useState('');
  const [finalDescription, updateFinalDescription] = useState('');
  const [button, updateButton] = useState(false);
  // State for Activity Save button
  const [closeActivitySaveButton, updateCloseActivitySavebutton] = useState(false);

  // state for input textarea for log activity
  const [userLogActivity, updateUserLogActivty] = useState({});

  useEffect(() => {
    // Update Modal window state
    updateModalClose(modal);
  });

  useEffect(() => {
    updateFinalDescription(descriptionForCard);
  });

  function descriptionInfo(e) {
    e.preventDefault();
    updateInitialDescription(e.target.value);
  }

  function closeModal(e) {
    e.preventDefault();
    updateInitialDescription('');
    updateDescription('');

    updateModal(false);
    updateRenderActivity(false);
    // Close Save and Cancel button on Description when user closes modal
    updateButton(false);
    // Close TextArea for Description when user closes modal
    updateDescriptionStatus(true);
    // Close Edit title inside modal when user closes modal
    updateModalStatus(false);
    // Close Activity textArea Save button and clear input when usser closes modal
    updateCloseActivitySavebutton(false);

    // Erase log activity input when user closes modal
    updateUserLogActivty({ record: '' });

  }

  function updateCardTitle(e) {
    updateValues(e.target.value);
    if (e.key === 'Enter') {
      masterCharacter[columnNumber].list[cardNumber].card = e.target.value;
      updateColumnComponent(true);
      updateModalStatus(false);
      const updateTitle = async () => {
        try {
          const send = await fetch('api/update', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(masterCharacter[columnNumber].list[cardNumber])
          });
          const response = await send.json();
          const copyCharacter = masterCharacter.concat();
          copyCharacter[columnNumber].list[cardNumber].card = response.rows[0].card;
          updateModalTitle(masterCharacter[columnNumber].list[cardNumber].card);
          updateMasterCharacter(masterCharacter);
        } catch (err) {
          console.error(err);
        }
      };
      updateTitle();
    }
  }

  function handleSubmit(e) {
    updateValues(e.target.value);
    e.preventDefault();
  }

  const clickUpdate = () => {
    updateValues(masterCharacter[columnNumber].list[cardNumber].card);
    updateModalStatus(true);
  };

  const clickUpdateDescription = () => {
    updateButton(true);
    const description = finalDescription;
    updateInitialDescription(description);
    updateDescriptionStatus(false);
  };

  const updateDescriptionInput = () => updateDescriptionStatus(false);

  const updateCancelButton = () => {
    updateDescriptionStatus(true);
    updateButton(false);
  };

  const saveButton = async e => {
    e.preventDefault();
    if (initialDescription) {
      const description = initialDescription;
      updateButton(true);
      updateDescriptionStatus(true);
      updateDescription(initialDescription);
      try {
        const descriptionUpdate = await fetch('/api/description', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify([masterCharacter[columnNumber].list[cardNumber].cardId, description])
        });
        const result = await descriptionUpdate.json();
        updateDescriptionForCard(result[0].description);
        updateFinalDescription(result[0].description);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={modalClose ? 'container centerModal' : 'hidden'}>
      <div className="text-right">
        <button type='click' className="btn btn-danger clseFont deleteBtn" onClick={() => updateConfirmationModal(false)}>Delete</button>
        <button type="submit" className="btn btn-light closeFont" onClick={e => closeModal(e)}>Close</button>
      </div>
      <div className="row d-flex flex-column">
        <div className=" pt-2 pb-50">
          <div className="d-flex align-items-center pl-2">
            <i className="fas fa-tasks logoSize"></i>
            {/** **********************************************Card Title **********************************************************************/}
            <h3 className={modalStatus ? 'hidden' : 'pl-2'}>{modalTitle}</h3>
            <p className={modalStatus ? 'hidden' : 'pl-2'} onClick={clickUpdate}>Edit</p>
            <input text="type" className={modalStatus ? 'pl-2' : 'hidden'} value={values} onChange={e => handleSubmit(e)} onKeyUp={e => updateCardTitle(e)}></input>
          </div>
        </div>
        <div className=" pt-2 descriptionPadding">
          <div className="d-flex align-items-center pl-2">
            <i className="fas fa-database"></i>
            {/** ******************************************************************DESCRIPTION SECTION************************************************/}
            <h3 className="pl-2">Description</h3>
            <p className={modalStatus ? 'hidden' : 'pl-2'} onClick={clickUpdateDescription}>Edit</p>
          </div>
          <div className="pl-2">
            <form onChange={e => descriptionInfo(e)}>
              {/** **************************************************************TEXT AREA TO WRITE DESCRIPTION *****************************************************************/}
              <textarea className={descriptionStatus ? 'hidden' : 'form-control w-75'} rows="4" value={initialDescription}></textarea>
              <p className={descriptionStatus ? 'pl-4' : 'hidden'} onClick={updateDescriptionInput}>{finalDescription}</p>
              <button type="submit" className={button ? 'btn btn-success mt-2' : 'hidden'} onClick={e => saveButton(e)} >Save</button>
              <button type="button" className={button ? 'btn btn-danger mt-2 ml-1' : 'hidden'} onClick={updateCancelButton}>Cancel</button>
            </form>
          </div>
        </div>
        <div className="pl-2 pt-4">
          <Activity modalClose={modalClose} updateConfirmationActivityDeleteModal={updateConfirmationActivityDeleteModal} updateActivityIdDelete={updateActivityIdDelete} userLogActivity={userLogActivity} updateUserLogActivty={updateUserLogActivty} updateCloseActivitySavebutton={updateCloseActivitySavebutton} closeActivitySaveButton={closeActivitySaveButton} modalStatus={modalStatus} characters={characters} renderActivity={renderActivity} updateMasterCharacter={updateMasterCharacter} masterCharacter={masterCharacter} columnNumber={columnNumber} cardNumber={cardNumber} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
