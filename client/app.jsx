import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
  }, [character]);

  const allowDrop = e => {
    e.preventDefault();
  };

  const dropIt = (e, info, position) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('id');
    const name = e.dataTransfer.getData('name');
    const img = e.dataTransfer.getData('img');

    if (character[info.id].id !== id) {
      character[info.id].list.push({ name: name, img: img });
      const returnedObject = Object.assign({}, character);
      character[id].list.forEach((values, index) => {
        if (values.name === name) {
          character[id].list.splice(index, 1);
        }
      });
      updateCharacters(returnedObject);

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
