import React, { useEffect, useState } from 'react';
import Activity from './activity';

const Modal = ({ modal, columnNumber, cardNumber, masterCharacter, updateMasterCharacter, updateColumnComponent }) => {
  const [values, updateValues] = useState('');
  const [modalClose, updateModalClose] = useState(null);
  const [clickClose, updateClickClose] = useState(null);
  const [modalStatus, updateModalStatus] = useState(false);
  const [descriptionStatus, updateDescriptionStatus] = useState(false);
  const [initialDescription, updateInitialDescription] = useState('');
  const [finalDescription, updateFinalDescription] = useState('');
  const [button, updateButton] = useState(false);

  useEffect(() => {
    if (modalClose === null) {
      updateModalClose(modal);
    }

    if (!modalClose) {
      updateModalClose(modal);
    }

  });

  function descriptionInfo(e) {
    e.preventDefault();
    if (e.key === 'Enter' || e.target.className === 'btn btn-success mt-2') {
      updateFinalDescription(initialDescription);
      updateDescriptionStatus(true);
    }
    if (e.target.value) {
      updateButton(true);
    } else {
      updateButton(false);
    }
  }

  function saveBtn() {
    this.setState({ textValue: true });
  }

  function closeModal() {
    // updateModalClose(false);
  }

  // function cancelControlBtn() {
  //   if (!this.state.button) {
  //     return 'hidden';
  //   }
  //   return 'btn btn-danger mt-2 ml-1';
  // }

  function updateCardTitle(e) {
    if (e.key === 'Enter') {
      const column = this.props.columnNumber;
      const card = this.props.cardNumber;
      const character = this.props.masterCharacter;
      character[column].list[card].name = e.target.value;
      masterCharacter[columnNumber].list[cardNumber].name = e.target.value;
      updateMasterCharacter(masterCharacter);
      updateColumnComponent(true);
      const name = e.target.value;
      updateValues(name);
      updateModalStatus(false);
    }
  }

  function handleSubmit(e) {
    const name = e.target.value;
    this.setState({ value: name });
  }

  function handleSubmitTwo(e) {
    e.preventDefault();
    descriptionInfo();
  }

  function selectedListInfo() {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    const character = this.props.masterCharacter;
    if (character.length !== 0) {
      return character[column].list[card].name;
    }
  }

  const clickUpdate = () => {
    updateValues(masterCharacter[columnNumber].list[cardNumber].name);
    updateModalStatus(true);
  };

  const clickUpdateDescription = () => updateDescriptionStatus(false);
  const updateDescription = e => updateInitialDescription(e.target.value);
  const updateDescriptionInput = () => updateDescriptionStatus(false);
  const upddateCancelButton = () => {
    updateClickClose(false);
  };

  const test = () => console.log('modal', modalClose);

  return (
    <div className={!modalClose ? 'hidden' : 'form-control w-75'}>
      <div className="text-right">
        <button type="button" className="btn btn-light closeFont" onClick={updateModalClose(false)}>Close</button>
      </div>
      {test()}
      <div className="row d-flex flex-column">
        <div className=" pt-2 pb-50">
          <div className="d-flex align-items-center pl-2">
            <i className="fas fa-tasks logoSize"></i>
            <h3 className={modalStatus ? 'hidden' : 'pl-2'}>{values}</h3>
            <p className={modalStatus ? 'hidden' : 'pl-2'} onClick={clickUpdate}>Edit</p>
            <input text="type" className={modalStatus ? 'hidden' : 'pl-2'} value={values} onChange={e => handleSubmit(e)} onKeyUp={e => updateCardTitle(e)}></input>
          </div>
        </div>
        <div className=" pt-2 descriptionPadding">
          <div className="d-flex align-items-center pl-2">
            <i className="fas fa-database"></i>
            <h3 className="pl-2">Description</h3>
            <p className={modalStatus ? 'pl-2' : 'hidden'} onClick={clickUpdateDescription}>Edit</p>
          </div>
          <div className="pl-2">
            <form onChange={e => updateDescription(e)} onClick={e => descriptionInfo(e)} onKeyUp={e => descriptionInfo(e)}>
              <textarea className={descriptionStatus ? 'hidden' : 'form-control w-75'} id="exampleFormControlTextarea1" rows="4"></textarea>
              <p className={descriptionStatus ? 'pl-4' : 'hidden'} onClick={updateDescriptionInput}>{finalDescription}</p>
              <button type="submit" className={button ? 'btn btn-success mt-2' : 'hidden'}>Save</button>
              <button type="button" className={button ? 'btn btn-danger mt-2 ml-1' : 'hidden'} onClick={upddateCancelButton}>Cancel</button>
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
