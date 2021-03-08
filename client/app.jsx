import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './component/column';

const App = () => {

  const characters = {
    todo: {
      id: 'todo',
      list: ['item1', 'item2', 'item3']
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

  const handleOnDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const [reorderedItem] = character.splice(result.source.index, 1);
    character.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(character);
  };

  return (
    <div className="columnCustom">
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {Object.values(character).map((values, index) => (
              <Column values={values} key={values.id} />
            ))}
        </DragDropContext>
    </div>
  );
};

export default App;

// [
//   {
//     id: 'Pekingese',
//     name: 'Gogo',
//     pic: '/images/pek1.jpg'
//   },
//   {
//     id: 'Golden-Retriever',
//     name: 'Lemon',
//     pic: '/images/golden.jpg'
//   },
//   {
//     id: 'Austrailian',
//     name: 'Peach',
//     pic: '/images/austrailian.jpg'
//   }
// ];
