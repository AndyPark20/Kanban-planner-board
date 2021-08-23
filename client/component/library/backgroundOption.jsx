import React, { useState } from 'react';

const Background = ({ status, searchValue, pictures, modalUpdateParent, userSelect }) => {
  const [keyWord, keyWordUpdate] = useState('');
  const [highlightBorder, updateHighLight] = useState(false);

  // hide Image until everything has been loaded
  const [imageLoad, updateImageLoad] = useState(false);

  const modalUpdate = () => {
    if (!status) {
      return 'container modalPosition hidden';
    }
    return 'container modalPosition';
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const renderPictures = () => {
    if (pictures !== null) {
      const downloadedData = pictures.map((values, index) => {
        return (
          <div key={index} className="col-3 d-flex p-3">
            <img onLoad={() => updateImageLoad(true)} className={imageLoad ? 'wallPaperStyle' : 'hidden'} src={values.src.tiny} alt="pictures" onClick={() => { userSelect(index); updateHighLight(true); updateImageLoad(true); }} />
          </div>
        );
      });
      return downloadedData;
    }
  };

  return (
    <div className={modalUpdate()}>
      <div className="rowModal">
        <div className="column">
          <form className="airportForm d-flex flex-column" onSubmit={e => handleSubmit(e)}>
            <label className="labelStyle">Category:</label>
            <div className="d-flex">
              <input className="inputStyle w-50 mr-1" type="text" name="airportCode" placeholder="ocean" onKeyUp={e => keyWordUpdate(e.target.value)} required></input>
              <button type="click" className="btn btn-primary btnSize mr-1" onClick={e => searchValue(e, keyWord)}>Search</button>
              <button type="click" className="btn btn-danger btnSize" onClick={modalUpdateParent}>Cancel</button>
            </div>
          </form>
        </div>

        <div className="row">
          {renderPictures()}
        </div>
      </div>
    </div>
  );
};

export default Background;
