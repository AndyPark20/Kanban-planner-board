
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ value: '', modalStatus: false, modalClose: false, description: '', descriptionStatus: false });
    this.modalEffect = this.modalEffect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.switchCardTitle = this.switchCardTitle.bind(this);
    this.updateCardTitle = this.updateCardTitle.bind(this);
    this.closeModdal = this.closeModal.bind(this);
    this.descriptionInfo = this.descriptionInfo.bind(this);
    this.descriptionStatus = this.descriptionStatus.bind(this);
    this.infoDescription = this.infoDescription.bind(this);
  }

  componentDidUpdate(prev) {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    if (prev.masterCharacter !== this.props.masterCharacter) {
      const updatedtitle = this.props.masterCharacter[column].list[card].name;
      this.setState({ value: updatedtitle });
    }

    if (prev.modal !== this.props.modal) {
      this.setState({ modalClose: this.props.modal });
    }
  }

  infoDescription() {
    if (!this.descriptionStatus) {
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
    if (!this.state.modalClose) {
      return 'container centerModal hidden';
    }
    return 'container centerModal ';
  }

  switchModal() {
    if (this.state.modalStatus) {
      return 'w-50';
    }
    return 'hidden';
  }

  descriptionInfo(e) {
    if (e.key === 'Enter') {
      this.setState({ description: e.target.value, descriptionStatus: true });
    }
  }

  switchCardTitle() {
    if (this.state.modalStatus) {
      return 'hidden';
    }
    return 'pl-2';
  }

  closeModal() {
    this.setState({ modalClose: false });
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
        <div className="row d-flex flex-column">
          <div className=" pt-2 pb-50 h-25">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className={this.switchCardTitle()}>{this.state.value}</h3>
              <p className={this.switchCardTitle()} onClick={() => this.setState({ value: character[column].list[card].name, modalStatus: true })}>edit</p>
              <input text="type" className={this.switchModal()} value={this.state.value} onChange={this.handleSubmit} onKeyUp={e => this.updateCardTitle(e)}></input>
            </div>
          </div>
          <div className="col pt-2 descriptionPadding">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-database"></i>
                <h3 className="pl-2">Description</h3>
            </div>
            <div>
              <textarea className={this.descriptionStatus()} id="exampleFormControlTextarea1" rows="2" onKeyUp={e => this.descriptionInfo(e)} ></textarea>
              <p className="" onClick={() => this.setState({ descriptionStatus: false })}>{this.state.description}</p>
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-light" onClick={() => this.closeModal()}>Close</button>
          </div>
        </div>
      </div>

    );
  }
}
