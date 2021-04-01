
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ value: 'hello' });
    this.modalEffect = this.modalEffect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  modalEffect() {
    if (!this.props.modal) {
      return 'container centerModal hidden';
      // hidden
    }
    return 'container centerModal ';
  }

  handleSubmit(e) {
    this.setState({ value: e.target.value });
  }

  test() {
    console.log('columnNumber', this.props.columnNumber);
    console.log('cardNumber', this.props.cardNumber);
    console.log('masterCharacter', this.props.masterCharacter);
  }

  render() {
    return (
      <div className={this.modalEffect()}>
        <div className="row">
          <div className="col pt-2">
            {this.test()}
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className="pl-2">Hello</h3>
              <p className="pl-2" onClick={() => console.log('hello')}>edit</p>
              <input text="type" className=" w-50" value={this.state.value} onChange={this.handleSubmit}></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
