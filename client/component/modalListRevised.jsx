import React, { useEffect, useState } from 'react';
import Activity from './activity';

const Modal = ({ column, card, character }) => {
  const [values, updateValue] = useState('');

  function infoDescription() {
    if (this.state.descriptionStatus) {
      return 'pl-4';
    }
    return 'hidden';
  }

  function descriptionStatus() {
    if (this.state.descriptionStatus) {
      return 'hidden';
    }
    return 'form-control w-75';
  }

  function modalEffect() {
    if (this.state.modalClose) {
      return 'container centerModal';
    }
    if (!this.state.modalClose) {
      return 'container centerModal hidden';
    }
  }

  function descriptionInfo(e) {
    e.preventDefault();
    if (e.key === 'Enter' || e.target.className === 'btn btn-success mt-2') {
      this.setState({ finalDescription: this.state.initialDescription, descriptionStatus: true });
    }
    if (e.target.value) {
      this.setState({ button: true });
    } else {
      this.setState({ button: false });
    }
  }

  function saveBtn() {
    this.setState({ textValue: true });
  }

  function switchCardTitle() {
    if (this.state.modalStatus) {
      return 'hidden';
    }
    return 'pl-2';
  }

  function closeModal() {
    this.setState({ modalClose: false });
  }

  function saveControlBtn() {
    if (!this.state.button) {
      return 'hidden';
    }
    return 'btn btn-success mt-2';
  }

  function cancelControlBtn() {
    if (!this.state.button) {
      return 'hidden';
    }
    return 'btn btn-danger mt-2 ml-1';
  }

  function updateCardTitle(e) {
    if (e.key === 'Enter') {
      const column = this.props.columnNumber;
      const card = this.props.cardNumber;
      const character = this.props.masterCharacter;
      character[column].list[card].name = e.target.value;
      this.props.updateMasterCharacter(character);
      this.props.updateColumnComponent(true);
      const name = e.target.value;
      this.setState({ value: name, modalStatus: false });
    }
  }

  function handleSubmit(e) {
    const name = e.target.value;
    this.setState({ value: name });
  }

  function handleSubmitTwo(e) {
    e.preventDefault();
    this.descriptionInfo();
  }

  function selectedListInfo() {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    const character = this.props.masterCharacter;
    if (character.length !== 0) {
      return character[column].list[card].name;
    }
  }

  const clickUpdate = () => {
    console.log('column', column);
    console.log('card', card);
    console.log('character', character);
  };

  // this.setState({ value: character[column].list[card].name, modalStatus: true })
  return (
    // <div className={this.modalEffect()}>
    <div>
      <div className="text-right">
        <button type="button" className="btn btn-light closeFont" onClick={() => this.closeModal()}>Close</button>
      </div>
      <div className="row d-flex flex-column">
        <div className=" pt-2 pb-50">
          <div className="d-flex align-items-center pl-2">
            <i className="fas fa-tasks logoSize"></i>
            {/* <h3 className={this.switchCardTitle()}>{this.state.value}</h3> */}
            {/* <p className={this.switchCardTitle()} onClick={() => clickUpdate()}>Edit</p> */}
            {/* <input text="type" className={this.switchModal()} value={this.state.value} onChange={this.handleSubmit} onKeyUp={e => this.updateCardTitle(e)}></input> */}
          </div>
        </div>
        <div className=" pt-2 descriptionPadding">
          <div className="d-flex align-items-center pl-2">
            <i className="fas fa-database"></i>
            <h3 className="pl-2">Description</h3>
            <p className={this.switchCardTitle()} onClick={() => this.setState({ descriptionStatus: false })}>Edit</p>
          </div>
          <div className="pl-2">
            <form onChange={e => this.setState({ initialDescription: e.target.value })} onClick={e => this.descriptionInfo(e)} onKeyUp={e => this.descriptionInfo(e)}>
              <textarea className={this.descriptionStatus()} id="exampleFormControlTextarea1" rows="4"></textarea>
              <p className={this.infoDescription()} onClick={() => this.setState({ descriptionStatus: false })}>{this.state.finalDescription}</p>
              <button type="submit" className={this.saveControlBtn()}>Save</button>
              <button type="button" className={this.cancelControlBtn()} onClick={e => this.setState({ descriptionStatus: true, description: this.state.finalDescription })}>Cancel</button>
            </form>
          </div>
        </div>
        <div className="pl-2 pt-4">
          <Activity />
        </div>
      </div>
    </div>

  );
};

export default Modal;
