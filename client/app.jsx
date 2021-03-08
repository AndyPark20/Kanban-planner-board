import React from 'react';

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
    }
  ];

const renderIt = () => {
  const animals = characters.map((value, index) => {
    return (
      <div key={index} className="col-12 d-flex">
        <div className="picture">
          <img src={value.pic} alt={value.name} />
        </div>
        <div className="information">
          <h3>{value.name}</h3>
          <h3>{value.id}</h3>
        </div>
      </div>
    );
  });
  return animals;
};

const App = () => {
  return (
    <div className="container">
      <div className="row">
        {renderIt()}
      </div>
    </div>
  );
};

export default App;
