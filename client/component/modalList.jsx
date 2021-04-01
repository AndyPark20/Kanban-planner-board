
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ value: 'hello', modalStatus: false });
    this.modalEffect = this.modalEffect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchModal = this.switchModal.bind(this);
  }

  modalEffect() {
    if (!this.props.modal) {
      return 'container centerModal hidden';
      // hidden
    }
    return 'container centerModal ';
  }

  switchModal() {
    if (this.state.modalStatus) {
      return 'w-50';
    }
    return 'hidden';
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
    return (
      <div className={this.modalEffect()}>
        <div className="row">
          <div className="col pt-2">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className="pl-2">{this.selectedListInfo()}</h3>
              <p className="pl-2" onClick={() => this.setState({ modalStatus: true }) }>edit</p>
              <input text="type" className={this.switchModal()} value={this.state.value} onChange={this.handleSubmit}></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
