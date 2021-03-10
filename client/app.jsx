import React, { useState } from 'react';
import Column from './component/column';

const App = () => {
  const characters = {
    todo: {
      id: 'todo',
      list: [{ name: 'gogo', img: 'images/pek1.jpg' }, { name: 'Lemon', img: 'images/austrailian.jpg' }, { name: 'Penny', img: 'images/golden.jpg' }]
    },
    doing: {
      id: 'doing',
      list: []
    },
    done: {
      id: 'done',
      list: []
    }
  };

  const [character, updateCharacters] = useState(characters);

  const allowDrop = e => {
    e.preventDefault();
  };

  const dropIt = (e, info, position) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const name = e.dataTransfer.getData('name');
    const img = e.dataTransfer.getData('img');
    const index = e.dataTransfer.getData('startIndex');
    const finishIndex = e.dataTransfer.getData('finishIndex');
    // console.log(e.dataTransfer.types);
    // console.log(index);
    // console.log(finishIndex);
    if (character[id].id === id) {
      // const [reorderedItem] = character[id].list.map(;

    }

  };

  const renderIt = () => {
    const loop = Object.values(character).map((info, index) => {
      return (
        <div key={index} onDragOver={e => allowDrop(e)} onDrop={e => dropIt(e, info, index)}>
          <Column values={info} key={index} />
        </div>
      );
    });
    return loop;
  };

  return (
    <div className="columnCustom">
      {renderIt()}
    </div>
  );
};

export default App;
