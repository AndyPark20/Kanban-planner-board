import React, { useState, useEffect } from 'react';
import Item from './item';

const Column = () => {
  const characters = {
    todo: {
      id: 'todo',
      list: []
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
  const [columnMover, updateColumnMover] = useState(false);
  const [packageColumn, updatePackageColumn] = useState(false);

  const dropIt = (e, info, position) => {
    // the column index number
    e.preventDefault();
    const identity = e.dataTransfer.getData('name');
    const imgs = e.dataTransfer.getData('img');
    const originId = e.dataTransfer.getData('originId');
    if (character[info.id].id !== originId && columnMover && !packageColumn) {
      if (e.target.nodeName !== 'IMG') {
        character[info.id].list.push({ img: imgs, name: identity });
        const returnedObjects = Object.assign({}, character);
        character[originId].list.forEach((values, index) => {
          if (values.name === identity) {
            character[originId].list.splice(index, 1);
          }
        });
        updateCharacters(returnedObjects);
        character[info.id].list.forEach((value, index) => {
          // console.log(character[info.id].list);
        });
      }
    }

  };

  /** **the column part */
  const lastIndex = (e, info, index) => {
    e.preventDefault();
    const startIndex = e.dataTransfer.getData('startIndex');
    const finishedIndex = index;
    const [reordered] = character[info.id].list.splice(startIndex, 1);
    character[info.id].list.splice(finishedIndex, 0, reordered);
    const returnedObject = Object.assign({}, character);
    updateCharacters(returnedObject);
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  const controlDragStart = (e, values, info, index) => {
    console.log('item');
    updatePackageColumn(false);
    updateColumnMover(true);
    e.dataTransfer.setData('originId', info.id);
    e.dataTransfer.setData('name', values.name);
    e.dataTransfer.setData('img', values.img);
    e.dataTransfer.setData('startIndex', index);
  };

  const makeNewItem = (e, info) => {
    const chosenTopic = info.id;
    character[info.id].list.push({ name: 'gogo', img: 'images/pek1.jpg' });
    const addedCardObject = Object.assign({}, character);
    updateCharacters(addedCardObject);
  };

  // functions to move columns around

  const moveColumn = (e, index) => {
    // updateColumnMover(false);
    // updatePackageColumn(true);
    e.dataTransfer.setData('columnStartIndex', index);
  };

  const renderIt = () => {
    const loop = Object.values(character).map((info, index) => {
      return (
        <div key={index} className="col-4 d-flex text-center flex-column justify-content-around w-100 border select" draggable onDragStart={e => moveColumn(e, index)} onDrag={e => allowDrop(e)} onDrop={e => dropIt(e, info, index)}>
          <div className="d-flex align-items-end justify-content-around w-100">
            <h2 className="fontColor">{info.id}</h2>
            <h6 className="point fontColor" onClick={e => makeNewItem(e, info)}>add</h6>
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
