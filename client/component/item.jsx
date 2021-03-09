import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ text, index,img }) => {

  return (
  <Draggable draggableId={text} index={index}>
    {provided => (
      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <img className="pictureCustom" src={img} alt="dog" />
      </div>
    )}
  </Draggable>
  );
};
export default Item;
