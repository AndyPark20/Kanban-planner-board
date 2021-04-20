
import React from 'react';
import Activity from './activity';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = (
      {
        value: '',
        modalStatus: false,
        modalClose: false,
        initialDescription: '',
        finalDescription: '',
        descriptionStatus: false,
        textValue: false,
        button: false
      });
    this.modalEffect = this.modalEffect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.switchCardTitle = this.switchCardTitle.bind(this);
    this.updateCardTitle = this.updateCardTitle.bind(this);
    this.closeModdal = this.closeModal.bind(this);
    this.descriptionInfo = this.descriptionInfo.bind(this);
    this.descriptionStatus = this.descriptionStatus.bind(this);
    this.infoDescription = this.infoDescription.bind(this);
    this.saveBtn = this.saveBtn.bind(this);
    this.saveControlBtn = this.saveControlBtn.bind(this);
    this.cancelControlBtn = this.cancelControlBtn.bind(this);
  }

  componentDidUpdate(prev, ps) {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    if (prev.masterCharacter !== this.props.masterCharacter) {
      const updatedtitle = this.props.masterCharacter[column].list[card].name;
      this.setState({ value: updatedtitle });
    }

    if (ps.modalClose !== this.props.modal) {
      this.setState({ modalClose: this.props.modal });
    }

  }

  infoDescription() {
    if (this.state.descriptionStatus) {
      return 'pl-4';
    }
    return 'hidden';
  }

  descriptionStatus() {
    if (this.state.descriptionStatus) {
      return 'hidden';
    }
    return 'form-control w-75';
  }

  modalEffect() {
    if (this.state.modalClose) {
      return 'container centerModal';
    }
    if (!this.state.modalClose) {
      return 'container centerModal hidden';
    }
  }

  switchModal() {
    if (this.state.modalStatus) {
      return 'w-50';
    }
    return 'hidden';
  }

  descriptionInfo(e) {
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

  saveBtn() {
    this.setState({ textValue: true });
  }

  switchCardTitle() {
    if (this.state.modalStatus) {
      return 'hidden';
    }
    return 'pl-2';
  }

  closeModal() {
    this.setState({ modalClose: true });
  }

  saveControlBtn() {
    if (!this.state.button) {
      return 'hidden';
    }
    return 'btn btn-success mt-2';
  }

  cancelControlBtn() {
    if (!this.state.button) {
      return 'hidden';
    }
    return 'btn btn-danger mt-2 ml-1';
  }

  updateCardTitle(e) {
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

  handleSubmit(e) {
    const name = e.target.value;
    this.setState({ value: name });
  }

  handleSubmitTwo(e) {
    e.preventDefault();
    this.descriptionInfo();
  }

  selectedListInfo() {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    const character = this.props.masterCharacter;
    if (character.length !== 0) {
      return character[column].list[card].name;
    }
  }

  render() {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    const character = this.props.masterCharacter;
    return (
      <div className={this.modalEffect()}>
        <div className="text-right">
          <button type="button" className="btn btn-light closeFont" onClick={() => this.closeModal()}>Close</button>
        </div>
        <div className="row d-flex flex-column">
          <div className=" pt-2 pb-50">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className={this.switchCardTitle()}>{this.state.value}</h3>
              <p className={this.switchCardTitle()} onClick={() => this.setState({ value: character[column].list[card].name, modalStatus: true })}>Edit</p>
              <input text="type" className={this.switchModal()} value={this.state.value} onChange={this.handleSubmit} onKeyUp={e => this.updateCardTitle(e)}></input>
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
  }
}
