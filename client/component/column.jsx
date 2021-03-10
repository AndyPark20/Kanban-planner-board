import React from 'react';
import Item from './item';

const Column = ({ values: { list, id } }) => {

  const listing = () => {

    const controlDragStart = (e, values, index) => {
      e.dataTransfer.setData('name', values.name);
      e.dataTransfer.setData('img', list.img);
      e.dataTransfer.setData('id', id);
      e.dataTransfer.setData('startIndex', index);
    };

    const lastIndex = (e, index) => {
      e.dataTransfer.setData('finishIndex', index);
    };

    const renderIt = list.map((values, index) => {
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
