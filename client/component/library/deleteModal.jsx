import React from 'react';

const DeleteModal = () => {

  return (
    <div className="deleteModal">
      <h3 className="deleteTitle">Are you Sure you want to delete this card?</h3>
      <div className="button-layout">
      <button type="click" className ="btn btn-danger">Yes</button>
      <button type="click" className="btn btn-warning">No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
