import React from 'react';

const deleteActivity = () => {

  return (
    <div className={confirmationModal ? 'deleteModal hidden' : 'deleteModal'}>
      <h3 className="deleteTitle">Are you Sure you want to delete this card?</h3>
      <div className="button-layout">
        <button type="click" className="btn btn-danger danger" onClick={deleteCard}>Yes</button>
        <button type="click" className="btn btn-warning warning" onClick={() => updateConfirmationModal(true)}>No</button>
      </div>
    </div>
  );
};

export default deleteActivity;
