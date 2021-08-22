import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { render } from 'react-dom';

const Activity = ({ updateCloseActivitySavebutton, closeActivitySaveButton, modalStatus, characters, renderActivity, updateMasterCharacter, masterCharacter, cardNumber, columnNumber }) => {

  const [userLog, updateUserLog] = useState('');
  const [valueLog, updateValueLog] = useState('');
  const [userLogSubmit, updateUserLogSubmit] = useState([]);
  const [userEdit, updateUserEdit] = useState(false);
  const [editIndexNumber, updateEditIndexNumber] = useState(null);
  const [saveButton, updateSaveButton] = useState(false);
  const [renderActivityItem, updateRenderActivity] = useState(false);
  // track which activity user wants to edit via index number in the array
  const [currentIndex, updateCurrentIndex] = useState(null);

  // store selected activity object that needs to be updated
  const [selectedActivityObject, updateSelectedActivityObject] = useState({});

  useEffect(() => {
    updateSaveButton(closeActivitySaveButton);
  });

  useEffect(() => {
    if (userEdit) {
      updateUserLog(masterCharacter[columnNumber].list[cardNumber].activity[editIndexNumber]);
    }
  }, [userEdit]);

  const userActivity = e => {
    updateCloseActivitySavebutton(true);
    e.preventDefault();
    if (!userEdit) {
      updateUserLog({ record: e.target.value, time: Date.now() });
    } else {
      masterCharacter[columnNumber].list[cardNumber].activity.splice(editIndexNumber, 1, { record: e.target.value, time: Date.now() });
      updateUserLog({ record: e.target.value, time: Date.now() });

    }
    if (e.target.value !== '') {
      updateSaveButton(true);
    } else {
      updateSaveButton(false);
    }
  };

  // When clicked "Edit" for activity
  const userEditActivity = index => {
    updateSelectedActivityObject(masterCharacter[columnNumber].list[cardNumber].activity[index]);
    updateUserEdit(true);
    updateEditIndexNumber(index);
    updateValueLog(userLogSubmit[index]);
    updateCurrentIndex(index);
    // Render Save and Cancel button
    updateSaveButton(true);

    // update user log
    updateUserLog({ record: masterCharacter[columnNumber].list[cardNumber].activity[index].record });

  };

  const deleteActivityLog = async activityId => {
    // use Delete method to remove the activity in the backend
    const deleteActivity = await fetch(`/api/deleteActivity/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
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
            <h6 className="pl-2 editActivity" onClick={() => deleteActivityLog(values.activityId)}>Delete</h6>
          </div>
        );
      });
      return data;
    }
  };

  // When user clicks SAVE button next to Activity TextArea
  const userSave = async e => {
    e.preventDefault();
    if (!userEdit && userLog.record) {
      const activityList = masterCharacter[columnNumber].list[cardNumber].activity;

      // copy Mastercharacter
      const copiedMastercharacter = masterCharacter.concat();
      // If this is the first time writing an activity (activity === undefined)
      if (!activityList) {
        copiedMastercharacter[columnNumber].list[cardNumber].activity = [userLog];
        updateMasterCharacter(copiedMastercharacter);
      } else {
        copiedMastercharacter[columnNumber].list[cardNumber].activity.push(userLog);
        updateMasterCharacter(copiedMastercharacter);
      }

      // console.log(masterCharacter);

      // Properties toa dd from the selected values of MasterCharacter object
      const cardId = masterCharacter[columnNumber].list[cardNumber].cardId;
      const cardName = masterCharacter[columnNumber].list[cardNumber].card;
      const list = masterCharacter[columnNumber].id;
      const activity = masterCharacter[columnNumber].list[cardNumber].activity;

      // Create an object that holds the updated activity log which will be sent to the backend for SQL update
      const copiedActivity = {
        cardId: cardId,
        cardName: cardName,
        list: list,
        cardNumber: cardNumber,
        activity: activity
      };

      updateUserLogSubmit(masterCharacter[columnNumber].list[cardNumber].activity);
      updateUserLog({ record: '' });
      updateUserEdit(false);
      updateRenderActivity(true);

      try {
        const activityPost = await fetch('/api/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(copiedActivity)
        });
        const result = await activityPost.json();
        // once activity has been updated in the backend
        if (result) {
          try {
            const data = await fetch('/api/retrieve');
            const resultsWithUpdatedActivity = await data.json();

            // Make a copy of the masterCharacter
            const copiedMastercharacter = masterCharacter.concat();

            // loop master character and if the id equals to the column name of the returned promise, push the values form resultWithUpdatedActivity to the values of the object's list.
            copiedMastercharacter.forEach(values => {
              if (values.id === resultsWithUpdatedActivity.column) { values.list.push(resultsWithUpdatedActivity[0]); }
            });
            updateMasterCharacter(copiedMastercharacter);
            updateSaveButton(false);
          } catch (err) {
            console.error(err);
          }
        }

      } catch (err) {
        console.error(err);
      }
      // For editing Existing Activity
    } else {
      updateUserLog({ record: '' });
      updateUserLogSubmit(userLogSubmit);
      updateUserEdit(false);
      const updatedActivity = masterCharacter[columnNumber].list[cardNumber].activity[currentIndex];
      try {
        const editActivity = await fetch('/api/editActivity', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify([updatedActivity, selectedActivityObject])
        });
        // return promise
        const result = await editActivity.json();

        // if promised has been successfully returned, updateMasterCharacter
        if (result) {
          try {
            const data = await fetch('/api/retrieve');
            const result = await data.json();
            // push it to characters array of objects.
            const copiedObject = Object.assign(characters);

            // Use hashMap to push values into the correct properties in the copiedObject
            result.forEach(values => {
              const characterList = copiedObject[values.column].list;
              characterList.push(values);
              copiedObject[values.column] = { ...copiedObject[values.column], list: characterList };
            });

            updateMasterCharacter(Object.values(copiedObject));
            updateSaveButton(false);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // User Cancels editing Activity
  const editActivityCancel = async () => {
    updateUserEdit(false);
    updateSaveButton(false);
    updateUserLog({ record: '' });

    // call backend to update masterCharacter
    try {
      const data = await fetch('/api/retrieve');
      const result = await data.json();
      // Copy a clone of characters object
      const copiedObject = Object.assign(characters);
      // Use map method to update the object into an array.
      const updateObject = copiedObject.map(values => {
        result.forEach(copyValues => {
          if (values.id === copyValues.column) {
            values.list.push({ card: copyValues.card, activity: copyValues.activity, cardId: copyValues.cardId, description: copyValues.description });
          }
        });
        return values;
      });
      updateMasterCharacter(updateObject);
    } catch (err) {
      console.error(err);
    }
  };

  // Save user Text on Activity
  const renderInputText = () => {
    updateUserLog({ record: '' });
  };

  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <form onChange={e => userActivity(e)} className="d-flex" required>
        <textarea className="form-control w-75" rows="1" value={userLog.record} required onChange={renderInputText}></textarea>
        <button type="submit" className={saveButton ? 'btn btn-success mt-2 ml-2' : 'hidden'} onClick={e => userSave(e)}>Save</button>
        <button type="button" className={saveButton ? 'btn btn-danger mt-2 ml-2' : 'hidden'} onClick={editActivityCancel}>Cancel</button>
      </form>
      <div className="pl-4">
        {renderLog()}
      </div>
    </div>
  );
};

export default Activity;
