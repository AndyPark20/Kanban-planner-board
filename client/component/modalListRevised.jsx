import e from 'cors';
import React, { useEffect, useState } from 'react';
import Activity from './activity';

const Modal = ({ modal, columnNumber, cardNumber, masterCharacter, updateMasterCharacter, updateColumnComponent, updateModal }) => {
  const [values, updateValues] = useState('');
  const [finalValues, updateFinalValues] = useState('');
  const [modalClose, updateModalClose] = useState(false);
  const [modalStatus, updateModalStatus] = useState(false);
  const [descriptionStatus, updateDescriptionStatus] = useState(false);
  const [initialDescription, updateInitialDescription] = useState(null);
  const [finalDescription, updateFinalDescription] = useState('');
  const [button, updateButton] = useState(true);

  useEffect(() => {
    updateInitialDescription(null);
    if (masterCharacter.length !== 0) {
      if (masterCharacter[columnNumber].list[cardNumber].desc !== undefined) {
        updateInitialDescription(undefined);
      }
    }
    updateModalClose(modal);
  });

  const renderDescription = () => {
    return initialDescription;
  };

  function descriptionInfo(e) {
    e.preventDefault();
    console.log(e.target.value);
    // updateInitialDescription(e.target.value);
  }

  function closeModal(e) {
    updateModal(false);
    e.target.reset();
  }

  function updateCardTitle(e) {
    updateValues(e.target.value);
    if (e.key === 'Enter') {
      masterCharacter[columnNumber].list[cardNumber].name = values;
      const modalCardTitle = masterCharacter[columnNumber].list[cardNumber].name;
      updateFinalValues(modalCardTitle);
      updateMasterCharacter(masterCharacter);
      updateColumnComponent(true);
      updateModalStatus(false);
    }
  }

  function handleSubmit(e) {
    updateValues(e.target.value);
    e.preventDefault();
  }

  const clickUpdate = () => {
    updateValues(masterCharacter[columnNumber].list[cardNumber].name);
    updateModalStatus(true);
  };

  const clickUpdateDescription = () => {
    const description = masterCharacter[columnNumber].list[cardNumber].desc;
    if (description !== '') {
      updateInitialDescription(description);
      updateDescriptionStatus(false);
    }
    updateButton(true);
  };

  const updateDescriptionInput = () => updateDescriptionStatus(false);

  const updateCancelButton = () => {
    masterCharacter[columnNumber].list[cardNumber].desc = finalDescription;
    updateDescriptionStatus(true);
    updateButton(false);
  };

  const saveButton = e => {
    e.preventDefault();
    masterCharacter[columnNumber].list[cardNumber].desc = initialDescription;
    updateDescriptionStatus(true);
    updateButton(true);
    updateMasterCharacter(masterCharacter);
    updateDescriptionStatus(true);
    updateButton(false);
  };

  return (
    <form onChange={e => descriptionInfo(e)}>
      <div className={modalClose ? 'container centerModal' : 'hidden'}>
        <div className="text-right">
          <button type="button" className="btn btn-light closeFont" onClick={e => closeModal(e)}>Close</button>
        </div>
        <div className="row d-flex flex-column">
          <div className=" pt-2 pb-50">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className={modalStatus ? 'hidden' : 'pl-2'}>{finalValues}</h3>
              <p className={modalStatus ? 'hidden' : 'pl-2'} onClick={clickUpdate}>Edit</p>
              <input text="type" className={modalStatus ? 'pl-2' : 'hidden'} value={values} onChange={e => handleSubmit(e)} onKeyUp={e => updateCardTitle(e)}></input>
            </div>
          </div>
          <div className=" pt-2 descriptionPadding">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-database"></i>
              <h3 className="pl-2">Description</h3>
              <p className={modalStatus ? 'hidden' : 'pl-2'} onClick={clickUpdateDescription}>Edit</p>
            </div>
            <div className="pl-2">
              <textarea className={descriptionStatus ? 'hidden' : 'form-control w-75'} rows="4" value={initialDescription}></textarea>
              <p className={descriptionStatus ? 'pl-4' : 'hidden'} onClick={updateDescriptionInput}>{renderDescription()}</p>
              <button type="click" className={button ? 'btn btn-success mt-2' : 'hidden'} onClick={e => saveButton(e)} >Save</button>
              <button type="button" className={button ? 'btn btn-danger mt-2 ml-1' : 'hidden'} onClick={updateCancelButton}>Cancel</button>
            </div>
          </div>
          <div className="pl-2 pt-4">
            <Activity />
          </div>
        </div>
      </div>
    </form>
    // e => this.setState({ descriptionStatus: true, description: this.state.finalDescription })
  );
};

export default Modal;
