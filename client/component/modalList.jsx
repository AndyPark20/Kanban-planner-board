
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ value: '', modalStatus: false });
    this.modalEffect = this.modalEffect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.switchCardTitle = this.switchCardTitle.bind(this);
    this.updateCardTitle = this.updateCardTitle.bind(this);
  }

  componentDidUpdate(prev) {
    const column = this.props.columnNumber;
    const card = this.props.cardNumber;
    if (prev.masterCharacter !== this.props.masterCharacter) {
      const updatedtitle = this.props.masterCharacter[column].list[card].name;
      this.setState({ value: updatedtitle });
    }

  }

  modalEffect() {
    if (!this.props.modal) {
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

  switchCardTitle() {
    if (this.state.modalStatus) {
      return 'hidden';
    }
    return 'pl-2';
  }

  updateCardTitle(e) {
    if (e.key === 'Enter') {
      const column = this.props.columnNumber;
      const card = this.props.cardNumber;
      const character = this.props.masterCharacter;
      character[column].list[card].name = e.target.value;
      this.props.updateMasterCharacter(character);
      this.setState({ value: e.target.Value, modalStatus: false });
    }
  }

  handleSubmit(e) {
    this.setState({ value: e.target.value });
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
        <div className="row">
          <div className="col pt-2">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className={this.switchCardTitle()}>{this.state.value}</h3>
              <p className={this.switchCardTitle()} onClick={() => this.setState({ value: character[column].list[card].name, modalStatus: true })}>edit</p>
              <input text="type" className={this.switchModal()} value={this.state.value} onChange={this.handleSubmit} onKeyUp={e => this.updateCardTitle(e)}></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
