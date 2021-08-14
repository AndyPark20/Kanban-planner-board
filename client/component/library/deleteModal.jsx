import React, { useEffect, useState } from 'react';

const DeleteModal = ({ masterCharacter, updateConfirmationModal, confirmationModal, columnNumber, cardNumber }) => {

  // delete card by calling backend
  const deleteCard = async () => {
    const selectedCardId = masterCharacter[columnNumber].list[cardNumber].cardId;
    const deleteCard = await fetch(`/api/delete/${selectedCardId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  // function for ClassName to hide and unhide the confirmation modal
  const hideConfirmationModal = () => {
    if (confirmationModal) {
      return 'deleteModal hidden';
    } else {
      return 'deleteModal';
    }
  };

  return (
    <div className={hideConfirmationModal()}>
      <h3 className="deleteTitle">Are you Sure you want to delete this card?</h3>
      <div className="button-layout">
        <button type="click" className="btn btn-danger danger" onClick={deleteCard}>Yes</button>
        <button type="click" className="btn btn-warning warning" onClick={() => updateConfirmationModal(true)}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
