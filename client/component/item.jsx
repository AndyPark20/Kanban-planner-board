import React, { useState } from 'react';

const Item = ({ cardName, userCardTitle, cardSequence, columnNumber, masterCharacter, update, values, titleBoolean }) => {

  const [pencil, updatePencil] = useState(false);

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

  const editPencil = () => {
    updatePencil(true);
  };

  const hidePencil = () => {
    updatePencil(false);
  };

  const pencilVisibility = () => {
    if (pencil) {
      return 'fas fa-pencil-alt position-absolute  top-0 start-0';
    }
    return 'hidden';
  };

  return (
    <div className="card spacing" draggable onMouseEnter={() => editPencil()} onMouseLeave={() => hidePencil()} onClick={() => console.log('hello')}>
      <div className="card-body">
        <div className="text-right position-relative">
          <i className={pencilVisibility()}></i>
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
