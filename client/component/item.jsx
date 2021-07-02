import React, { useState, useEffect } from 'react';

const Item = ({ description, cardName, update, userCardTitle, cardSequence, columnNumber, masterCharacter, values, titleBoolean, updateModal, masterCharacterUpdate, selectedCard }) => {

  const [pencil, updatePencil] = useState(false);
  const [input, updateInput] = useState('');
  const [openModal, updateOpenModal] = useState(false);
  const [selectedItem, updatedSelectedItem] = useState('');

  const handleUpdateInput = event => updateInput(event.target.value);
  const handleSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    updatedSelectedItem(selectedCard);
  });

  const enterTitle = async e => {
    if (e.key === 'Enter' && e.target.value !== '' && columnNumber !== undefined) {
      masterCharacter[columnNumber].list[cardSequence] = { name: e.target.value };
      masterCharacter[columnNumber].list[cardSequence].desc = description;
      masterCharacter[columnNumber].list[cardSequence].activity = [];
      update(masterCharacter);
      masterCharacterUpdate(masterCharacter);
      titleBoolean(true);
      updateOpenModal(true);
      try {
        const result = await fetch('/api/addCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(masterCharacter)
        });
        const response = await result.json();
        console.log(response);
      } catch (err) {
        console.error('ERR' + err);
      }
    }
  };

  const editPencil = () => {
    updatePencil(true);
  };

  const hidePencil = () => updatePencil(false);

  const pencilVisibility = () => {
    if (pencil) {
      return 'fas fa-pencil-alt position-absolute top-0 start-0';
    }
    return 'hidden';
  };

  return (
    <div className="card spacing" draggable onMouseEnter={editPencil} onMouseLeave={hidePencil} >
      <div className="card-body">
        <div className="text-right position-relative">
          <i className={pencilVisibility}></i>
        </div>
        <h5 className="card-title">{values.name}</h5>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter a title for this card" className={values.name ? 'hidden' : 'titleEnter'} onKeyUp={enterTitle} onChange={handleUpdateInput} required></input>
        </form>
      </div>
    </div>
  );
};

export default Item;
