import React, { useState, useEffect } from 'react';
import Item from './item';

const Column = () => {
  const characters = [
    {
      id: 'todo',
      list: []

    },
    {
      id: 'doing',
      list: []
    },
    {
      id: 'done',
      list: []
    }
  ];

  const [character, updateCharacters] = useState(characters);
  const [columnMover, updateColumnMover] = useState(false);

  const dropIt = (e, info, position) => {
    // the column index number
    e.preventDefault();
    const identity = e.dataTransfer.getData('name');
    const imgs = e.dataTransfer.getData('img');
    const originId = e.dataTransfer.getData('startIndex');
    const columnStartIndex = e.dataTransfer.getData('columnStartIndex');
    if (character.id !== originId && !columnMover) {
      if (e.target.nodeName !== 'IMG') {
        character[position].list.push({ img: imgs, name: identity });
        const returnedObjects = character.concat();
        updateCharacters(returnedObjects);
        character[columnStartIndex].list.forEach((values, index) => {
          if (values.name === identity) {
            character[columnStartIndex].list.splice(index, 1);
          }
        });
      }
    } else {
      const originCol = e.dataTransfer.getData('columnStartIndex');
      character.forEach((description, value) => {
        if (description.id === character[originCol].id) {
          character.splice(value, 1, character[position]);
          // character.splice(position, 1, character[value]);
          const strippedData = character.concat();
          console.log(strippedData);
          updateCharacters(strippedData);
        }
      });
    }
  };

  /** **the column part */
  const lastIndex = (e, info, index) => {
    e.preventDefault();
    const startIndex = e.dataTransfer.getData('startIndex');
    const finishedIndex = index;

    const [reordered] = character.list.splice(startIndex, 1);
    character.list.splice(finishedIndex, 0, reordered);
    const returnedObject = Object.assign({}, character);
    updateCharacters(returnedObject);
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  const controlDragStart = (e, values, info, index) => {
    e.dataTransfer.setData('originId', info.id);
    e.dataTransfer.setData('name', values.name);
    e.dataTransfer.setData('img', values.img);
    e.dataTransfer.setData('startIndex', index);
  };

  const makeNewItem = (e, info, index) => {
    character[index].list.push({ name: 'gogo', img: 'images/pek1.jpg' });
    const addedCardObject = character.concat();
    updateCharacters(addedCardObject);
  };

  // functions to move columns around
  const moveColumn = (e, info, value) => {
    if (e.target.nodeName === 'IMG') {
      updateColumnMover(false);
      e.dataTransfer.setData('columnStartIndex', value);
    } else {
      updateColumnMover(true);
      e.dataTransfer.setData('columnStartIndex', value);
    }

  };

  const renderIt = () => {
    const loop = character.map((info, index) => {
      return (
        <div key={index} className="col-4 d-flex text-center flex-column justify-content-around w-100 border select" draggable onDragStart={e => moveColumn(e, info, index)} onDrag={e => allowDrop(e)} onDrop={e => dropIt(e, info, index)}>
          <div className="d-flex align-items-end justify-content-around w-100">
            <h2 className="fontColor">{info.id}</h2>
            <h6 className="point fontColor" onClick={e => makeNewItem(e, info, index)}>add</h6>
          </div>
          <div className=" columnBackground w-100 columnCustom d-flex flex-column" onDragOver={e => allowDrop(e)} >
            {info.list.map((values, index) => {
              return (
                <div key={index} draggable onDragStart={e => controlDragStart(e, values, info, index)} onDrag={e => allowDrop(e)} onDrop={e => lastIndex(e, info, index)} >
                  <Item values={values} />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    return loop;
  };

  return (
    <div className="container w-100">
      <div className="row  w-100">
        {renderIt()}
      </div>
    </div>
  );
};

export default Column;
