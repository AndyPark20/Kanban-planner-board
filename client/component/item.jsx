import React, { useState, useEffect } from 'react';

const Item = ({ updateDescription, cardName, update, userCardTitle, cardSequence, columnNumber, masterCharacter, values, titleBoolean, updateModal, masterCharacterUpdate, selectedCard }) => {

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

  const enterTitle = e => {
    if (e.key === 'Enter' && e.target.value !== '' && columnNumber !== undefined) {
      masterCharacter[columnNumber].list[cardSequence] = { name: e.target.value };
      masterCharacter[columnNumber].list[cardSequence].desc = '';
      update(masterCharacter);
      masterCharacterUpdate(masterCharacter);
      titleBoolean(true);
      updateOpenModal(true);
      updateDescription(true);
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

  // const test = {
  //   input1 : '',
  //   input2: ''
  // }

  // this is if you want to reuse input updating for multiple fields
  // const handleUpdateInputTest = (fieldName) => (event) => updateTestInput({...testInput, [fieldName]: event.target.value});

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
