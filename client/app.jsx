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
    console.log('working');
  };

  const dropIt = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('id');
    console.log(data);
  };

  const renderIt = () => {
    const loop = Object.values(character).map((info, index) => {
      return (
        <div key={index} onDragOver={e => allowDrop(e)} onDrop={e => dropIt(e)}>
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
