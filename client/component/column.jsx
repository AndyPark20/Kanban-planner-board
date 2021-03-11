import React, { useEffect, useState } from 'react';
import Item from './item';

const Column = () => {
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

  // const [ordered, setOrdered] = useState(list);
  // const [character, updateCharacters] = useState(characters);


  // const allowDrop = e => {
  //   e.preventDefault();
  // };

  // const dropIt = (e, info, position) => {
  //   e.preventDefault();
  //   const id = e.dataTransfer.getData('id');
  //   const name = e.dataTransfer.getData('name');
  //   const img = e.dataTransfer.getData('img');
  //   if (character[info.id].id !== id) {
  //     if (e.target.nodeName !== 'IMG') {
  //       character[info.id].list.push({ name: name, img: img });
  //       const returnedObject = Object.assign({}, character);
  //       character[id].list.forEach((values, index) => {
  //         if (values.name === name) {
  //           character[id].list.splice(index, 1);
  //         }
  //       });
  //       updateCharacters(returnedObject);
  //     }
  //   }
  // };

  // const listing = () => {
  //   const renderIt = ordered.map((values, index) => {
  //     return (
  //       <div key={index} draggable onDragStart={e => controlDragStart(e, values, index)} onDrop={e => lastIndex(e, index)} >
  //         <Item value={values.name} img={values.img} />
  //       </div>
  //     );
  //   });
  //   return renderIt;
  // };
  // onDragOver = { e => allowDrop(e)} onDrop = { e => dropIt(e, info, index) }

/** **the column part */
  const lastIndex = (e, index) => {
    const startIndex = e.dataTransfer.getData('startIndex');
    const finishedIndex = index;
    const [reordered] = list.splice(startIndex, 1);
    list.splice(finishedIndex, 0, reordered);
    const test = list.concat();
    setOrdered(test);

  };

  // const controlDragStart = (e, values, index) => {
  //   e.dataTransfer.setData('name', values.name);
  //   e.dataTransfer.setData('img', values.img);
  //   e.dataTransfer.setData('id', id);
  //   e.dataTransfer.setData('startIndex', index);
  // };


  const renderIt = () => {
    const loop = Object.values(characters).map((info, index) => {
      return (
        <div key={index}  className="col-4 d-flex text-center align-items-center flex-column justify-content-around">
          <h2>{info.id}</h2>
          <div className="border border-danger w-100 columnCustom  d-flex flex-column">
            {info.list.map((values, index) => {
              return(
                <div key={index} draggable onDragStart={e=>lastIndex(e,index)}>
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
      {/*
        <div className="border border-danger w-50 custom">
        {listing()}
      </div>
     </div> */}
    </div>

  );

};

export default Column;
