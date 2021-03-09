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

  const renderIt = () => {
    const loop = Object.values(character).map((info, index) => {
      return (
        <Column values={info} key={index} />
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
