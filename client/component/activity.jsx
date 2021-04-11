import React, { useState, useEffect } from 'react';

const Activity = () => {

  const [userLog, updateUserLog] = useState('');
  const [userLogSubmit, updateUserLogSubmit]= useState([])

  const userActivity = e => {
    e.preventDefault();
    updateUserLog(e.target.value)
  };

  useEffect(()=>{
    console.log(userLogSubmit)
  },[userLogSubmit])

  const renderLog = () => {
    const data = userLogSubmit.map((values, index) => {
      return (
        <div key={index}>
         <p>{values}</p>
        </div>
      );
    });
    console.log(data)
    return data;
  };

  const userSave =(e)=>{
    e.preventDefault()
    updateUserLogSubmit(userLogSubmit.concat(userLog))
  }

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
        <button type="submit" className="btn btn-success mt-2" onClick={(e)=>userSave(e)}>Save</button>
      </form>
    </div>
  );
};

export default Activity;
