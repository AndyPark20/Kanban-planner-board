import React, { useState } from 'react';

const Item = ({ cardName, userCardTitle, cardSequence, columnNumber, masterCharacter, update, values, titleBoolean }) => {

  const handleSubmit = e => {
    e.preventDefault();
  };

  const enterTitle = e => {
    if (e.key === 'Enter' && e.target.value !== '' && columnNumber !== undefined) {
      masterCharacter[columnNumber].list[cardSequence] = { name: e.target.value };
      update(masterCharacter);
      titleBoolean(true);
    }
  };

  const hideTitleEdit = () => {
    if (values.name !== '') {
      return 'hidden';
    }
    return 'titleEnter';
  };

  return (
    <div className="card spacing" draggable>
      <div className="card-body border border-primary">
        <div className="text-right">
          <i className="fas fa-pencil-alt"></i>
        </div>
        <h5 className="card-title">{values.name}</h5>
        <form onSubmit={e => handleSubmit(e)}>
          <input type="text" placeholder="Enter a title for this card" className={hideTitleEdit()} onKeyUp={e => enterTitle(e)} required></input>
        </form>
      </div>
    </div>
  );
};

export default Item;
