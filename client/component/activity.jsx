import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { render } from 'react-dom';


const Activity = ({ updateConfirmationActivityDeleteModal, updateActivityIdDelete, updateUserLogActivty, userLogActivity, updateCloseActivitySavebutton, closeActivitySaveButton, modalStatus, characters, renderActivity, updateMasterCharacter, masterCharacter, cardNumber, columnNumber }) => {



  const [userLog, updateUserLog] = useState({});
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
    updateUserLog(userLogActivity);
    updateSaveButton(closeActivitySaveButton);
  });


  useEffect(() => {
    if (userEdit) {
      updateUserLog(masterCharacter[columnNumber].list[cardNumber].activity[editIndexNumber]);
    }
  }, [userEdit]);

  const userActivity = e => {
    updateCloseActivitySavebutton(true);
    updateUserLogActivty(e.target.value);
    e.preventDefault();
    if (!userEdit) {
      updateUserLog({ record: e.target.value, time: Date.now() });
      updateUserLogActivty({ record: e.target.value, time: Date.now() });
    } else {
      masterCharacter[columnNumber].list[cardNumber].activity.splice(editIndexNumber, 1, { record: e.target.value, time: Date.now() });
      updateUserLog({ record: e.target.value, time: Date.now() });
      updateUserLogActivty({ record: e.target.value, time: Date.now() });

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

    // update Modal List revised component state for rendering buttons
    updateCloseActivitySavebutton(true);

    // update user log
    updateUserLog({ record: masterCharacter[columnNumber].list[cardNumber].activity[index].record });
    updateUserLogActivty({ record: masterCharacter[columnNumber].list[cardNumber].activity[index].record });
  };

  const deleteActivityLog = async activityId => {
    // use Delete method to remove the activity in the backend
    updateActivityIdDelete(activityId);
    updateConfirmationActivityDeleteModal(false);
  };

  //Delete selected activity card
  const deleteActivityLog = async activityId => {
    // use Delete method to remove the activity in the backend
    const deleteActivity = await fetch(`/api/deleteActivity/${activityId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    if(deleteActivity){
      try {
        const data = await fetch('/api/retrieve');
        const result = await data.json();
        // Add the results into characters object
        if (result) {
          // loop thru the returned result
          result.forEach(values => {
            const charactersList = updatedCharacters[values.column].list;
            charactersList.push(values);
            updatedCharacters[values.column] = { ...updatedCharacters[values.column], list: charactersList };
          });
        }

        updateMasterCharacter(Object.values(updatedCharacters));
      } catch (err) {
        console.error(err);
      }
    }
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

      } else {
        copiedMastercharacter[columnNumber].list[cardNumber].activity.push(userLog);

      }

      // Properties toa dd from the selected values of MasterCharacter object
      const cardId = copiedMastercharacter[columnNumber].list[cardNumber].cardId;
      const cardName = copiedMastercharacter[columnNumber].list[cardNumber].card;
      const list = copiedMastercharacter[columnNumber].id;
      const activity = copiedMastercharacter[columnNumber].list[cardNumber].activity;

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
      updateUserLogActivty({ record: e.target.value });
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
            const copiedMastercharacter = Object.assign(characters);
            resultsWithUpdatedActivity.forEach(values => {
              console.log(values);
              const characterList = copiedMastercharacter[values.column].list;
              characterList.push(values);
              copiedMastercharacter[values.column] = { ...copiedMastercharacter[values.column], list: characterList };
            });
            updateMasterCharacter(Object.values(copiedMastercharacter));
            updateSaveButton(false);
            updateCloseActivitySavebutton(false);
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
      updateUserLogActivty({ record: e.target.value });
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
    updateUserLogActivty({ record: '' });
    updateCloseActivitySavebutton(false);

    // call backend to update masterCharacter
    try {
      const data = await fetch('/api/retrieve');
      const result = await data.json();

      // Copy a clone of characters object
      const copiedCharacterObject = Object.assign(characters);
      // When result promise has been returned, insert the result values to the appropriate values in the character object.
      result.forEach(values => {
        const characterList = copiedCharacterObject[values.column].list;
        characterList.push(values);
        copiedCharacterObject[values.column] = { ...copiedCharacterObject[values.column], list: characterList };
      });
      // update MasterCharacter
      updateMasterCharacter(Object.values(copiedCharacterObject));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center pl-2">
        <i className="fas fa-chart-line"></i>
        <h3 className="pl-2">Activity</h3>
      </div>
      <form onChange={e => userActivity(e)} className="d-flex" required>
        <textarea className="form-control w-75" rows="1" value={userLog.record} required></textarea>
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
