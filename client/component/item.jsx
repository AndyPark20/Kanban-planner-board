import React, { useState } from 'react';

const Item = ({ cardName, userCardTitle, cardSequence, columnNumber }) => {
  const [title, updateTitle] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
  };

  const enterTitle = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      updateTitle(false);
      cardName(e.target.value);
    }
  };

  const hideTitleEdit = () => {
    if (!title) {
      return 'hidden';
    }
    return 'titleEnter';
  };

  const test = () => {
    console.log('cardSeq', cardSequence);
    console.log('column', columnNumber);
  };

  return (
    <div className="card spacing cardStyle" draggable>
      <h5 className="card-title">{userCardTitle}</h5>
      {test()}
      <form onSubmit={e => handleSubmit(e)}>
          <input type="text" placeholder="Enter a title for this card" className={hideTitleEdit()} onKeyUp={e => enterTitle(e)} required></input>
      </form>
    </div>
  );
};

export default Item;
