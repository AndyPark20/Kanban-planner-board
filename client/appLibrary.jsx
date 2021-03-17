import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './component/columnLibrary';

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
  const handleOnDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.source.droppableId === result.destination.droppableId) {
      const idName = result.destination.droppableId;
      const reOrder = character[idName].list;
      const [chosenIndex] = reOrder.splice(result.source.index, 1);
      reOrder.splice(result.destination.index, 0, chosenIndex);
      updateCharacters(characters);
    } else {
      const idName = result.destination.droppableId;
      const originalName = result.source;
      const originalNameId = result.source.droppableId;
      const originalNameIndex = result.source.index;
      const movedOrder = character[idName].list;
      movedOrder.push(character[originalNameId].list[originalNameIndex]);
      Object.values(character).forEach(values => {
        if (values.id === originalName.droppableId) {
          const deleteOriginal = character[originalName.droppableId].list;
          deleteOriginal.splice(result.source.index, 1);
        }
      });
    }

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
