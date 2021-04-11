import React, { useState } from 'react';

const Activity = () => {

  const userAtivity = e => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <form onChange={e => userAtivity(e)}>
        <textarea className="form-control w-75" rows="1"></textarea>
        <button type="submit" className="btn btn-success mt-2">Save</button>
      </form>
    </div>
  );
};

export default Activity;
