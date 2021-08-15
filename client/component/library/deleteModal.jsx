import React, { useEffect, useState } from 'react';

const DeleteModal = ({ updateModal, updateRenderActivity, updateMasterCharacter, masterCharacter, updateConfirmationModal, confirmationModal, columnNumber, cardNumber }) => {

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

  // delete card by calling backend
  const deleteCard = async () => {
    const selectedCardId = masterCharacter[columnNumber].list[cardNumber].cardId;
    const deleteCard = await fetch(`/api/delete/${selectedCardId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const result = await deleteCard.json();
    // if delete card is a sucess re-render master character object
    if (result) {

      // Close modal window for the card content
      updateModal(false);
      updateRenderActivity(false);
      updateConfirmationModal(true);
      const retrieveData = async () => {
        try {
          const data = await fetch('/api/retrieve');
          const result = await data.json();
          // Add the results into characters object
          if (result) {
            // loop thru the returned result
            result.forEach(values => {
              // debugger;
              const charactersList = characters[values.column].list;
              charactersList.push(values);
              charactersList[values.column] = { ...charactersList[values.column], charactersList };
            });
            console.log('updatedObject', characters);
          }

          updateMasterCharacter(Object.values(characters));
        } catch (err) {
          console.error(err);
        }

      };
      retrieveData();
    }
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
