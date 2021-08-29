import React from 'react';

const DeleteActivity = ({ updateRenderActivity, activityIdDelete, confirmationActivityDeleteModal, updateConfirmationActivityDeleteModal, characters, updateModal, updateMasterCharacter, masterCharacter, columnNumber, cardNumber }) => {

  // delete card by calling backend
  const deleteCard = async () => {
    const deleteActivity = await fetch(`/api/deleteActivity/${activityIdDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    const result = await deleteActivity.json();
    // if delete card is a sucess re-render master character object
    if (result) {
    // Close modal window for the card content
      updateRenderActivity(false);
      updateConfirmationActivityDeleteModal(true);
      const retrieveData = async () => {
        try {
          const data = await fetch('/api/retrieve');
          const result = await data.json();
          // Add the results into characters object
          if (result) {
          // loop thru the returned result
            result.forEach(values => {
              const charactersList = characters[values.column].list;
              charactersList.push(values);
              characters[values.column] = { ...characters[values.column], list: charactersList };
            });
          }

          updateMasterCharacter(Object.values(characters));
          updateRenderActivity(true);
        } catch (err) {
          console.error(err);
        }

      };
      retrieveData();
    }
  };

  return (
    <div className={confirmationActivityDeleteModal ? 'deleteModal hidden' : 'deleteModal'}>
      <h3 className="deleteTitle">Are you Sure you want to delete this Activity?</h3>
      <div className="button-layout">
        <button type="click" className="btn btn-danger danger" onClick={deleteCard}>Yes</button>
        <button type="click" className="btn btn-warning warning" onClick={() => updateConfirmationActivityDeleteModal(true)}>No</button>
      </div>
    </div>
  );
};

export default DeleteActivity;
