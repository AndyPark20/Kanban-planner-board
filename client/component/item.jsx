import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Item = () => {
  return (
    <Draggable></Draggable>
  );
};

// const renderIt = provided => {
//   const animals = character.map((value, index) => {
//     return (
//       <div key={index} {...provided.droppableProps} ref={provided.innerRef}>
//         <Draggable key={value.id} draggableId={value.id} index={index} >
//           {provided => {
//             return (
//               < div className="col-12 d-flex align-items-center border border-secondary mt-3" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//                 <img className="picture" src={value.pic} alt={value.name} />
//                 <h3>{value.id}</h3>
//               </div>
//             );
//           }}
//         </Draggable>
//       </div>
//     );
//   });
//   return animals;

export default Item;
