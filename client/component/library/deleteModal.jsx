import React, { useEffect, useState } from 'react';

const DeleteModal = ({ updateModal, updateRenderActivity, updateMasterCharacter, masterCharacter, updateConfirmationModal, confirmationModal, columnNumber, cardNumber }) => {

  const characters = [
    {
      id: 'Todo',
      list: []

    },
    {
      id: 'Doing',
      list: []
    },
    {
      id: 'Done',
      list: []
    }
  ];

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
          // push it to characters array of objects.
          const copiedObject = characters.concat();
          // received Data from back end
          const copiedObjectUpdate = result;
          // Use map method to update the object into an array.
          const updateObject = copiedObject.map(values => {
            copiedObjectUpdate.forEach(copyValues => {
              if (values.id === copyValues.column) {
                values.list.push({ card: copyValues.card, activity: copyValues.activity, cardId: copyValues.cardId, description: copyValues.description });
              }
            });
            return values;
          });
          updateMasterCharacter(updateObject);
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
