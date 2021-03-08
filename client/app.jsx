import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
const characters =
  [
    {
      id: 'Pekingese',
      name: 'Gogo',
      pic: '/images/pek1.jpg'
    },
    {
      id: 'Golden-Retriever',
      name: 'Lemon',
      pic: '/images/golden.jpg'
    },
    {
      id: 'Austrailian',
      name: 'Peach',
      pic: '/images/austrailian.jpg'
    }
  ];

const renderIt = provided => {
  const animals = characters.map((value, index) => {
    return (
      <div key={index} {...provided.droppableProps} ref={provided.innerRef}>
        <Draggable key={value.id} draggableId={value.id} index={index} >
          {provided => {
            return (
              < div className="col-12 d-flex align-items-center border border-secondary mt-3" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <img className="picture" src={value.pic} alt={value.name} />
                <h3>{value.id}</h3>
              </div>
            );
          }}
        </Draggable>
      </div>
    );
  });
  return animals;
};

const App = () => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="row d-flex justify-content-center w-50">
        <h1>Dogs That I want</h1>
        <DragDropContext>
          <Droppable droppableId="characters">
            {provided => renderIt(provided)}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
