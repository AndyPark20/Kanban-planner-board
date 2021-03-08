import React from 'react';
import item from './item';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ values: { id, list } }) => {

  return (
    <Droppable droppableId ={id}>
      {provided => (
          <h3 className="border border-danger">{list}</h3>
      )}
    </Droppable>
  );

};

export default Column;
