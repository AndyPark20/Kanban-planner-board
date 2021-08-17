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
  // track which activity user wants to edit via index number in the array
  const [currentIndex, updateCurrentIndex] = useState(null);

  // store selected activity object that needs to be updated
  const [selectedActivityObject, updateSelectedActivityObject] = useState({});

  useEffect((values)=>{
    console.log('masterCharacter', masterCharacter)
  })

  const characters = [
    {
      id: 'Todo',
      list: []

    },
    {
      id: 'Doing',
      list: []
    },
    {
      id: 'Done',
      list: []
    }
  ];

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

    // update user log
    updateUserLog({ info: masterCharacter[columnNumber].list[cardNumber].activity[index].record });

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
            <h6 className="pl-2 editActivity">Delete</h6>
          </div>
        );
      });
      return data;
    }
  };

  // When user clicks SAVE button next to Activity TextArea
  const userSave = async e => {
    e.preventDefault();
    if (!userEdit && userLog.info) {
      masterCharacter[columnNumber].list[cardNumber].activity = userLogSubmit.concat(userLog);
      // Copy Array;
      let copiedActivity;
      copiedActivity = { cardName: masterCharacter[columnNumber].list[cardNumber].card, list: masterCharacter[columnNumber].id, cardNumber: cardNumber, activity: masterCharacter[columnNumber].list[cardNumber].activity };
      updateUserLogSubmit(masterCharacter[columnNumber].list[cardNumber].activity);
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
        if (result) {
          try {
            const data = await fetch('/api/retrieve');
            const result = await data.json();
            // push it to characters array of objects.
            const copiedObject = characters.concat();

            // received Data from back end
            const copiedObjectUpdate = result;
            // Use map method to update the object into an array.
            const updateObject = copiedObject.map(values => {
              copiedObjectUpdate.forEach(copyValues => {
                if (values.id === copyValues.column) {
                  values.list.push({ card: copyValues.card, activity: copyValues.activity });
                }
              });
              return values;
            });
            updateMasterCharacter(updateObject);
          } catch (err) {
            console.error(err);
          }
        }

      } catch (err) {
        console.error(err);
      }
      // For editing Existing Activity
    } else {
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
            const copiedObject = characters.concat();
            // received Data from back end
            const copiedObjectUpdate = result;
            // Use map method to update the object into an array.
            const updateObject = copiedObject.map(values => {
              copiedObjectUpdate.forEach(copyValues => {
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
    updateUserLog({ info: '' });

    // call backend to update masterCharacter
    try {
      const data = await fetch('/api/retrieve');
      const result = await data.json();
      // push it to characters array of objects.
      const copiedObject = characters.concat();
      // received Data from back end
      const copiedObjectUpdate = result;
      // Use map method to update the object into an array.
      const updateObject = copiedObject.map(values => {
        copiedObjectUpdate.forEach(copyValues => {
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
    updateUserLog({ info: '' });
  };

  const saveButtonRender = () => {
    if (saveButton) {
      return 'btn btn-success mt-2 ml-2';
    }
    return 'hidden';
  };

  const cancelButtonRender = () => {
    if (saveButton) {
      return 'btn btn-danger mt-2 ml-2';
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
        <textarea className="form-control w-75" rows="1" value={userLog.info} required onChange={renderInputText}></textarea>
        <button type="submit" className={saveButtonRender()} onClick={e => userSave(e)}>Save</button>
        <button type="button" className={cancelButtonRender()} onClick={editActivityCancel}>Cancel</button>
      </form>
      <div className="pl-4">
        {renderLog()}
      </div>
    </div>
  );
};

export default Activity;
