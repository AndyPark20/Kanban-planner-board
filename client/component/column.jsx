import React, { useState } from 'react';
import Item from './item';

const Column = ({ values: { list, id } }) => {

  const listing = () => {

    const [ordered, setOrdered] = useState(list);

    const lastIndex = (e, index) => {
      if (id === id) {
        console.log(list);
        const startIndex = e.dataTransfer.getData('startIndex');
        const finishedIndex = index;
        const [reordered] = list.splice(startIndex, 1);
        list.splice(finishedIndex, 0, reordered);
        setOrdered(list);
      }
    };

    const controlDragStart = (e, values, index) => {
      e.dataTransfer.setData('name', values.name);
      e.dataTransfer.setData('img', list.img);
      e.dataTransfer.setData('id', id);
      e.dataTransfer.setData('startIndex', index);
    };

    const renderIt = ordered.map((values, index) => {
      return (
          <div key={index} draggable onDragStart={e => controlDragStart(e, values, index)} onDrop={e => lastIndex(e, index)} >
            <Item value={values.name} img={values.img} />
          </div>
      );
    });
    return renderIt;
  };

  return (
   <div className="container">
      <div className="row d-flex flex-column align-items-center">
       <div className="col-4">
         <h2>{id}</h2>
       </div>
        <div className="border border-danger w-50 custom">
        {listing()}
      </div>
     </div>
   </div>

  );

};

export default Column;
