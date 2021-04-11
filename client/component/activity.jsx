import React, { useState } from 'react';

const Activity = () => {

  const [userLog, updateUserLog] = useState([]);

  const userActivity = e => {
    e.preventDefault();
    updateUserLog(userLog.push(1));
  };

  const renderLog = () => {
    const data = userLog.map((values, index) => {
      return (
        <div key={index}>
          {console.log(values)}
        </div>
      );
    });
    return data;
  };

  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <div>
        {renderLog()}
      </div>
      <form onChange={e => userActivity(e)}>
        <textarea className="form-control w-75" rows="1"></textarea>
        <button type="submit" className="btn btn-success mt-2">Save</button>
      </form>
    </div>
  );
};

export default Activity;
