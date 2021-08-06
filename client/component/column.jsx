import React, { useState, useEffect } from 'react';
import Item from './item';

const Column = ({ updateDescriptionCard, updateModalTitle, updateRenderActivity, description, initialCharacter, updateDescription, masterCharacter, updateModal, updateCardNumberMaster, updateColumnNumberMaster, updateMasterCharacter, updatedCharacter, columnUpdate, updateColumnComponent }) => {

  const [columnMover, updateColumnMover] = useState(false);
  const [openModal, updateOpenModalColumn] = useState(false);
  const [cardNumber, updateCardNumber] = useState(0);
  const [cardTitle, updateCardTitle] = useState('');
  const [titleBoolean, updateTitleBoolean] = useState(false);
  const [selectedCard, updatedSelectedCard] = useState('');
  const [destination, updateDestination] = useState(null);

  useEffect(() => {
    updateMasterCharacter(initialCharacter);
  }, []);

  useEffect(() => {
    updateTitleBoolean(false);
  }, [titleBoolean]);

  useEffect(() => {
    if (updatedCharacter.length !== 0) {
      updateMasterCharacter(updatedCharacter);
      updateColumnComponent(false);
    }
  }, [columnUpdate]);

  const dropIt = (e, info, position) => {
    // the column index number
    e.preventDefault();
    const identity = e.dataTransfer.getData('name');
    const imgs = e.dataTransfer.getData('img');
    const originId = e.dataTransfer.getData('startIndex');
    const columnStartIndex = e.dataTransfer.getData('columnStartIndex');
    const description = e.dataTransfer.getData('description');
    if (masterCharacter.id !== originId && !columnMover) {
      if (e.target.nodeName === 'DIV' || e.target.nodeName === 'H5') {
        masterCharacter[position].list.push(masterCharacter[columnStartIndex].list[originId]);
        masterCharacter[columnStartIndex].list.splice(originId, 1);
        const returnedObjects = masterCharacter.concat();
        updateMasterCharacter(returnedObjects);
      }
    } else {
      const originCol = e.dataTransfer.getData('columnStartIndex');
      const desintationColumn = masterCharacter[position];
      [masterCharacter[originCol], masterCharacter[position]] = [masterCharacter[position], masterCharacter[originCol]];
      const finalResult = masterCharacter.concat();
      updateMasterCharacter(finalResult);
    }
  };

  // /*the column part */
  const lastIndex = (e, info, indexItem, index) => {
    e.preventDefault();
    const startIndex = e.dataTransfer.getData('startIndex');
    const finishedIndex = indexItem;
    [masterCharacter[index].list[startIndex], masterCharacter[index].list[finishedIndex]] = [masterCharacter[index].list[finishedIndex], masterCharacter[index].list[startIndex]];
    const copyCharacter = masterCharacter.concat();
    updateMasterCharacter(copyCharacter);
  };

  const allowDrop = e => {
    e.preventDefault();
    updateRenderActivity(false);
  };

  const controlDragStart = (e, values, info, indexItem) => {
    e.dataTransfer.setData('originId', info.id);
    e.dataTransfer.setData('name', values.name);
    e.dataTransfer.setData('img', values.img);
    e.dataTransfer.setData('startIndex', indexItem);
    e.dataTransfer.setData('description', values.desc);
  };

  const makeNewItem = async (e, info, index) => {
    masterCharacter[index].list.push({ name: '' });
    const addedCardObject = masterCharacter.concat();
    updateMasterCharacter(addedCardObject);

  };

  // functions to move columns around
  const moveColumn = (e, info, value) => {
    if (e.target.nodeName === 'DIV' && e.target.className === 'card spacing') {
      updateColumnMover(false);
      e.dataTransfer.setData('columnStartIndex', value);
    } else {
      updateColumnMover(true);
      e.dataTransfer.setData('columnStartIndex', value);
    }
  };

  const changeTitle = async (indexItem, index) => {
    updateRenderActivity(true);
    const cardTitle = masterCharacter[index].list[indexItem].card;
    updateCardTitle(cardTitle);
    updateModalTitle(cardTitle);
    updateColumnNumberMaster(index);
    updateCardNumberMaster(indexItem);
    updateCardNumber(indexItem);
    if (cardTitle) {
      updatedSelectedCard(masterCharacter[index].list[indexItem].name);
      updateModal(true);
    } else {
      updateModal(false);
    }
    try {
      const result = await fetch('/api/retrieve');
      const finalResult = await result.json();
      console.log(finalResult[indexItem]);

    } catch (err) {
      console.error(err);
    }
    updateDescriptionCard(masterCharacter[index].list[indexItem].description);
  };

  const columnStyle = () => {
    masterCharacter.forEach((info, index) => {
      if (info.list.length > 1) {
        return 'scroll col-4 d-flex text-center flex-column justify-content-around w-100 select';
      }
    });
    return 'col-4 d-flex text-center flex-column justify-content-around w-100 select';
  };

  const renderIt = () => {
    const loop = masterCharacter.map((info, index) => {
      return (
        <div key={index} className='scroll col-4 d-flex text-center flex-column justify-content-around w-100 select' draggable onDragStart={e => moveColumn(e, info, index)} onDrag={e => allowDrop(e)}
          onDrop={e => dropIt(e, info, index)}>
          <div className="d-flex align-items-end justify-content-around w-100">
            <h2 className="fontColor">{info.id}</h2>
            <h6 className="point fontColor" onClick={e => makeNewItem(e, info, index)}>add</h6>
          </div>
          <div className=" columnBackground w-100 columnCustom d-flex flex-column border border-dark" onDragOver={e => allowDrop(e)} >
            {info.list.map((values, indexItem) => {
              return (
                <div key={indexItem} onDragStart={e => controlDragStart(e, values, info, indexItem)} onDrag={e => allowDrop(e)} onDrop={e => lastIndex(e, info, indexItem, index)}
                  onClick={() => changeTitle(indexItem, index)}>
                  <Item description={description} updateDescription={updateDescription} selectedCard={selectedCard} selectedOpenItem={openModal} updateOpenModalColumn={updateOpenModalColumn} updateModal={updateModal} values={values.card} cardSequence={cardNumber}
                    columnNumber={index} masterCharacter={masterCharacter} cardName={cardTitle} cardHeading={cardTitle} update={updateMasterCharacter} titleBoolean={updateTitleBoolean}
                    masterCharacterUpdate={updateMasterCharacter} />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    return loop;
  };

  return (
    <div className="container w-100">
      <div className="row w-100">
        {renderIt()}
      </div>
    </div>
  );
};

export default Column;
