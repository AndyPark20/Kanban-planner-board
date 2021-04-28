import React, { useEffect, useState } from 'react';
import Activity from './activity';

const Modal = ({ modal, columnNumber, cardNumber, masterCharacter, updateMasterCharacter, updateColumnComponent, updateModal }) => {
  const [values, updateValues] = useState('');
  const [finalValues, updateFinalValues] = useState('');
  const [modalClose, updateModalClose] = useState(false);
  const [modalStatus, updateModalStatus] = useState(false);
  const [descriptionStatus, updateDescriptionStatus] = useState(false);
  const [initialDescription, updateInitialDescription] = useState('');
  const [finalDescription, updateFinalDescription] = useState('');
  const [button, updateButton] = useState(true);

  useEffect(() => {
    if (masterCharacter.length !== 0) {
      updateFinalValues(masterCharacter[columnNumber].list[cardNumber].name);
      const description = masterCharacter[columnNumber].list[cardNumber].desc;
      if (description === undefined) {
        updateButton(true);
        updateDescriptionStatus(false);
      }
    }

    updateModalClose(modal);
  });

  const renderDescription = () => {
    if (masterCharacter.length !== 0) {
      const description = masterCharacter[columnNumber].list[cardNumber].desc;
      if (description !== undefined) {
        return description;
      }
    }
  };

  function descriptionInfo(e) {
    e.preventDefault();
    if (e.key === 'Enter' || e.target.className === 'btn btn-success mt-2') {
      masterCharacter[columnNumber].list[cardNumber].desc = initialDescription;
      updateMasterCharacter(masterCharacter);
      updateFinalDescription(initialDescription);
      updateDescriptionStatus(true);
      updateButton(false);
    }
  }

  function closeModal() {
    updateModal(false);
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

  const updateDescription = e => {
    masterCharacter[columnNumber].list[cardNumber].desc = e.target.value;
    updateInitialDescription(masterCharacter[columnNumber].list[cardNumber].desc);
    updateMasterCharacter(masterCharacter);
  };

  const updateDescriptionInput = () => updateDescriptionStatus(false);

  const updateCancelButton = () => {
    masterCharacter[columnNumber].list[cardNumber].desc = finalDescription;
    updateFinalDescription(masterCharacter[columnNumber].list[cardNumber].desc);
    updateDescriptionStatus(true);
    updateButton(false);
  };

  const descInfo = () => {
    if (masterCharacter.length !== 0) {
      const description = masterCharacter[columnNumber].list[cardNumber].desc;
      if (description !== undefined) {
        return description;
      }
      return '';
    }
  };

  const saveBtn = e => {
    updateButton(true);
    // if (masterCharacter.length !== 0) {
    //   const description = masterCharacter[columnNumber].list[cardNumber].desc;
    //   if (e.target.value === '') {
    //     console.log('hello');
    //     updateButton(true);
    //   }
    // }
  };

  return (
    <div className={modalClose ? 'container centerModal' : 'hidden'}>
      <div className="text-right">
        <button type="button" className="btn btn-light closeFont" onClick={closeModal}>Close</button>
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
            <form onClick={e => descriptionInfo(e)} onKeyUp={e => descriptionInfo(e)}>
              <textarea className={descriptionStatus ? 'hidden' : 'form-control w-75'} onChange={e => updateDescription(e)}
                id="exampleFormControlTextarea1" rows="4" value={descInfo()} required></textarea>
              <p className={descriptionStatus ? 'pl-4' : 'hidden'} onClick={updateDescriptionInput}>{renderDescription()}</p>
              <button type="click" className={button ? 'btn btn-success mt-2' : 'hidden'} onClick={e => saveBtn(e)}>Save</button>
              <button type="button" className={button ? 'btn btn-danger mt-2 ml-1' : 'hidden'} onClick={updateCancelButton}>Cancel</button>
            </form>
          </div>
        </div>
        <div className="pl-2 pt-4">
          <Activity />
        </div>
      </div>
    </div>
    // e => this.setState({ descriptionStatus: true, description: this.state.finalDescription })
  );
};

export default Modal;
