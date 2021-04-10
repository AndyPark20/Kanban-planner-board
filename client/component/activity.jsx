import React from 'react';

const Activity = () => {
  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <form>
        <textarea className="form-control w-75" rows="1"></textarea>
      </form>
    </div>
  );
};

export default Activity;
