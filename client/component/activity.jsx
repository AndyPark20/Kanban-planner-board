import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { render } from 'react-dom';

const Activity = ({ renderActivity, updateMasterCharacter, masterCharacter, cardNumber, columnNumber }) => {

  const [userLog, updateUserLog] = useState('');
  const [valueLog, updateValueLog] = useState('');
  const [userLogSubmit, updateUserLogSubmit] = useState([]);
  const [userEdit, updateUserEdit] = useState(false);
  const [editIndexNumber, updateEditIndexNumber] = useState(null);
  const [saveButton, updateSaveButton] = useState(false);
  const [renderActivityItem, updateRenderActivity] = useState(false);

  // useEffect(() => {
  //   console.log(userLogSubmit);
  //   if (renderActivity) {
  //     const activityArray = masterCharacter[columnNumber].list[cardNumber].activity;
  //     console.log(activityArray);
  //     updateUserLogSubmit(activityArray);
  //   }
  // });

  useEffect(() => {
    if (userEdit) {
      updateUserLog(masterCharacter[columnNumber].list[cardNumber].activity[editIndexNumber]);
    }
  }, [userEdit]);

  const userActivity = e => {
    e.preventDefault();
    if (!userEdit) {
      updateUserLog({ info: e.target.value, time: Date.now() });
    } else {
      masterCharacter[columnNumber].list[cardNumber].activity.splice(editIndexNumber, 1, { info: e.target.value, time: Date.now() });
      updateUserLog({ info: e.target.value, time: Date.now() });
      // updateMasterCharacter(masterCharacter)
      // Need to update the master character
      // updateMasterCharacter(selected);
      // updateUserLog(selected)
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
    if (renderActivity && masterCharacter[columnNumber].list[cardNumber].activity) {
      const data = masterCharacter[columnNumber].list[cardNumber].activity.map((values, index) => {
        return (
            <div key={index} className="d-flex align-items-center">
              <i className="far fa-comment-dots icon"></i>
              <h5 className="pl-2 activity-info">{values.record}</h5>
            <Moment className="timeFontSize pl-2" format='YYYY/MM/DD hh:mm:ss'>{parseInt(values.time)}</Moment>
              <h6 className="pl-2 editActivity" onClick={() => userEditActivity(index)}>Edit</h6>
            </div>
        );
      });
      return data;
    }
  };

  const userSave = async e => {
    e.preventDefault();
    if (!userEdit && userLog.info) {
      masterCharacter[columnNumber].list[cardNumber].activity = userLogSubmit.concat(userLog);
      // Copy Array;
      let copiedActivity;
      copiedActivity = { cardName: masterCharacter[columnNumber].list[cardNumber].name, list: masterCharacter[columnNumber].id, cardNumber: cardNumber, activity: masterCharacter[columnNumber].list[cardNumber].activity };
      updateUserLogSubmit(masterCharacter[columnNumber].list[cardNumber].activity);
      updateMasterCharacter(masterCharacter);
      updateUserLog({ info: '' });
      updateUserEdit(false);
      updateRenderActivity(true);
      try {
        const cardInfo = await fetch('/api/cardIdRetrieve');
        const returnedPromisedCardInfo = await cardInfo.json();
        const cardDataResult = returnedPromisedCardInfo.rows;
        // loop thru CardDataResult and match card name, if it matches add cardId to the appropriate object
        cardDataResult.forEach((resultValues, index) => {
          if (resultValues.card === copiedActivity.cardName) {
            copiedActivity.activity.forEach((activityValue, indexValue) => {
              activityValue.mainCardId = resultValues.cardId;
            });
          }
        });
        const activityPost = await fetch('/api/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(copiedActivity)
        });
        const result = await activityPost.json();
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    } else {
      updateUserLogSubmit(userLogSubmit);
      updateUserEdit(false);
      updateUserLog({ info: '' });
    }
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
        <textarea className="form-control w-75" rows="1" value={userLog.info} required></textarea>
        <button type="submit" className={saveButtonRender()} onClick={e => userSave(e)}>Save</button>
      </form>
      <div className="pl-4">
        {renderLog()}
      </div>
    </div>
  );
};

export default Activity;
