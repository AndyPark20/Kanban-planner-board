import React, { useState, useEffect } from 'react';
import Item from './item';

const Column = () => {
  const characters = [
    {
      id: 'Todo',
      list: [{ name: 'gogo', img: 'images/pek1.jpg' }, { name: 'Doodle', img: 'images/austrailian.jpg' }]

    },
    {
      id: 'Doing',
      list: []
    },
    {
      id: 'Done',
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
          const swap = character[position];
          character[position] = character[value];
          character[value] = swap;
          const swappedResult = character.concat();
          updateCharacters(swappedResult);
        }
      });
    }
  };

  /** **the column part */
  const lastIndex = (e, info, indexItem, index) => {
    e.preventDefault();
    const startIndex = e.dataTransfer.getData('startIndex');
    const finishedIndex = indexItem;
    const [reordered] = character[index].list.splice(startIndex, 1);
    character[index].list.splice(finishedIndex, 0, reordered);
    const copyCharacter = character.concat();
    updateCharacters(copyCharacter);
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  const controlDragStart = (e, values, info, indexItem) => {
    e.dataTransfer.setData('originId', info.id);
    e.dataTransfer.setData('name', values.name);
    e.dataTransfer.setData('img', values.img);
    e.dataTransfer.setData('startIndex', indexItem);
  };

  const makeNewItem = (e, info, index) => {
    character[index].list.push({ name: 'golden', img: 'images/golden.jpg' });
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

  const styles = () => {
    const result = character.map((info, values) => {
      if (info.list.length > 1) {
        return 'scroll col-4 d-flex text-center flex-column justify-content-around w-100 border select';
      } else if (info.list.length <= 1) {
        return 'col-4 d-flex text-center flex-column justify-content-around w-100 border select';
      }
    });
    return result;
  };

  const renderIt = () => {
    const loop = character.map((info, index) => {
      return (
        <div key={index} className={styles()} draggable onDragStart={e => moveColumn(e, info, index)} onDrag={e => allowDrop(e)} onDrop={e => dropIt(e, info, index)}>
          <div className="d-flex align-items-end justify-content-around w-100">
            <h2 className="fontColor">{info.id}</h2>
            <h6 className="point fontColor" onClick={e => makeNewItem(e, info, index)}>add</h6>
          </div>
          <div className=" columnBackground w-100 columnCustom d-flex flex-column" onDragOver={e => allowDrop(e)} >
            {info.list.map((values, indexItem) => {
              return (
                <div key={indexItem} onDragStart={e => controlDragStart(e, values, info, indexItem)} onDrag={e => allowDrop(e)} onDrop={e => lastIndex(e, info, indexItem, index)} >
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
