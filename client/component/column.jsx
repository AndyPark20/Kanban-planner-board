import React from 'react';
import Item from './item';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ values: { list, id } }) => {

  return (
  <Droppable droppableId={id}>
    {provided => (
      <div className="container">
        <div className="row d-flex flex-column align-items-center">
          <div className="col-4">
            <h2>{id}</h2>
          </div>
          <div className="border border-danger w-50 custom">
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((value, index) => (
                <Item key={value.name} text={value.name} img={value.img} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      </div>
    )}
  </Droppable>

);

};

export default Column;
