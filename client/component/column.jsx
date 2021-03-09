import React from 'react';
import Item from './item';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({ values: { list, id } }) => {

  return (

    <Droppable droppableId={id}>
      {provided => (
        <div>
          <div className="listColumn">
            <h2>{id}</h2>
          </div>
          <div>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((value, index) => (
                <Item key={value} text={value} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>

  );

};

export default Column;
