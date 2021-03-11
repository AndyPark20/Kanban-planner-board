import React, { useEffect, useState } from 'react';
import Item from './item';

const Column = () => {
  const characters = {
    todo: {
      id: 'todo',
      list: [{ name: 'gogo', img: 'images/pek1.jpg' }, { name: 'doodle', img: 'images/austrailian.jpg' }, { name: 'lab', img: 'images/golden.jpg' }]
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

  const dropIt = (e, info, position) => {
    //the column index number
    e.preventDefault();
    const id = info.id;
    const identity = e.dataTransfer.getData('name');
    const imgs = e.dataTransfer.getData('img');
    const originId = e.dataTransfer.getData('originId')
    if (character[info.id].id !== originId) {
      if (e.target.nodeName !== 'IMG') {
        character[info.id].list.push({ img: imgs, name: identity });
        const returnedObjects = Object.assign({}, character);
        character[originId].list.forEach((values, index) => {
          if (values.name === identity) {
            character[originId].list.splice(index, 1);
          }
        });
        updateCharacters(returnedObjects);
      }
    }

  };

  /** **the column part */
  const lastIndex = (e, info, index) => {
    const startIndex = e.dataTransfer.getData('startIndex');
    const finishedIndex = index;
    const [reordered] = character[info.id].list.splice(startIndex, 1);
    character[info.id].list.splice(finishedIndex, 0, reordered);
    const returnedObject = Object.assign({}, character)
    updateCharacters(returnedObject);
  };

  const allowDrop = e => {
    e.preventDefault();
  };

  const controlDragStart = (e, values, info, index) => {
    e.dataTransfer.setData('originId', info.id)
    e.dataTransfer.setData('name', values.name);
    e.dataTransfer.setData('img', values.img);
    e.dataTransfer.setData('startIndex', index);
  };


  const renderIt = () => {
    const loop = Object.values(character).map((info, index) => {
      return (
        <div key={index} className="col-4 d-flex text-center align-items-center flex-column justify-content-around">
          <h2>{info.id}</h2>
          <div className="border border-danger w-100 columnCustom d-flex flex-column" onDragOver={e => allowDrop(e)} onDrop={e => dropIt(e, info, index)}>
            {info.list.map((values, index) => {
              return (
                <div key={index} draggable onDragStart={e => controlDragStart(e, values, info, index)} onDrag={e => allowDrop(e)} onDrop={e => lastIndex(e, info, index)}>
                  <img className="pictureCustom" src={values.img} alt="dogs" />
                </div>
              )
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
