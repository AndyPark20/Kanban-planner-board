import React, { useEffect, useState } from 'react';

const DeleteModal = () => {

  const [closeConfirmation, updateConfirmation] = useState(null);

  // function for ClassName to hide and unhide the confirmation modal
  const hideConfirmationModal = () => {
    updateConfirmation(true);
  };

  // function to update closeConfirmation state
  const updateConfirmationState = () => {
    updateConfirmation(true);
  };

  return (
    <div className="deleteModal">
      <h3 className="deleteTitle">Are you Sure you want to delete this card?</h3>
      <div className="button-layout">
        <button type="click" className="btn btn-danger danger">Yes</button>
        <button type="click" className="btn btn-warning warning" onClick={updateConfirmationState}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
