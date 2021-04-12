import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

const Activity = () => {

  const [userLog, updateUserLog] = useState('');
  const [userLogSubmit, updateUserLogSubmit] = useState([]);

  const userActivity = e => {
    e.preventDefault();
    updateUserLog({ info: e.target.value, time: Date.now() });
  };

  useEffect(() => {
    console.log(userLogSubmit);
  }, [userLogSubmit]);

  const renderLog = () => {
    const data = userLogSubmit.map((values, index) => {
      return (
        <div key={index} className="d-flex align-items-center">
        <i className="far fa-comment-dots"></i>
      <h5 className="pl-2">{values.info}</h5>
          <Moment className="timeFontSize pl-2" format='YYYY/MM/DD hh:mm:ss'>{values.time}</Moment>
          <h6 className="pl-2 editActivity">Edit</h6>
        </div>
      );
    });
    return data;
  };

  const userSave = e => {
    e.preventDefault();
    updateUserLogSubmit(userLogSubmit.concat(userLog));
  };

  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <div className="pl-4">
        {renderLog()}
      </div>
      <form onChange={e => userActivity(e)}>
        <textarea className="form-control w-75" rows="1"></textarea>
        <button type="submit" className="btn btn-success mt-2" onClick={e => userSave(e)}>Save</button>
      </form>
    </div>
  );
};

export default Activity;
