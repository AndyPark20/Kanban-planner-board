import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Board from './component/board';

const App = () => {

  return (
  <div className="d-flex justify-content-center h-100">
    <DragDropContext onDragEnd={e => console.log(e)}>

    </DragDropContext>
  </div>
  );
};

export default App;
