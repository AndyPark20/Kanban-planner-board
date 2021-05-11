import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

const Activity = ({updateMasterCharacter, masterCharacter, cardNumber, columnNumber}) => {

  const [userLog, updateUserLog] = useState('');
  const [valueLog, updateValueLog] = useState('');
  const [userLogSubmit, updateUserLogSubmit] = useState([]);
  const [userEdit, updateUserEdit] = useState(false);
  const [editIndexNumber, updateEditIndexNumber] = useState(null);
  const [saveButton, updateSaveButton] = useState(false);

useEffect(()=>{
  if(masterCharacter.length !==0){
    console.log('masterCharacter', masterCharacter)
  }
})

  const userActivity = e => {
    e.preventDefault();
    if (!userEdit) {
      updateUserLog({ info: e.target.value, time: Date.now() });
    } else {
      const editArray = {};
      userLogSubmit.splice(editIndexNumber, 1, { info: e.target.value, time: Date.now() });
      updateUserLogSubmit(userLogSubmit);
    }
    if (e.target.value !== '') {
      updateSaveButton(true);
    } else {
      updateSaveButton(false);
    }
  };

  const userEditActivity = index => {
    updateUserEdit(true);
    updateEditIndexNumber(index);
    updateValueLog(userLogSubmit[index]);

  };

  const renderLog = () => {
    if(masterCharacter.length !==0){
      if(masterCharacter[columnNumber].list[cardNumber].activity !==undefined){
        const data = masterCharacter[columnNumber].list[cardNumber].activity.map((values, index) => {
          return (
            <div key={index} className="d-flex align-items-center">
              <i className="far fa-comment-dots"></i>
              <h5 className="pl-2">{console.log(values)}</h5>
              <Moment className="timeFontSize pl-2" format='YYYY/MM/DD hh:mm:ss'>{}</Moment>
              <h6 className="pl-2 editActivity" onClick={() => userEditActivity(index)}>Edit</h6>
            </div>
          );
        });
        return data;
      }

    }
  };

  const userSave = e => {
    e.preventDefault();
    if (!userEdit) {
      masterCharacter[columnNumber].list[cardNumber].activity = userLogSubmit.concat(userLog)
      updateUserLogSubmit(userLogSubmit.concat(userLog));
    } else {
      updateUserLogSubmit(userLogSubmit);
      updateUserEdit(false);
    }
  };

  const handleChange = e => {
    updateValueLog(e.target.value);
  };

  const saveButtonRender = () => {
    if (saveButton) {
      return 'btn btn-success mt-2 ml-2';
    }
    return 'hidden';
  };

  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <form onChange={e => userActivity(e)} className="d-flex" required>
        <textarea className="form-control w-75" rows="1" value={valueLog.info} onChange={e => handleChange(e)} required></textarea>
        <button type="submit" className={saveButtonRender()}onClick={e => userSave(e)}>Save</button>
      </form>
      <div className="pl-4">
        {renderLog()}
      </div>
    </div>
  );
};

export default Activity;
