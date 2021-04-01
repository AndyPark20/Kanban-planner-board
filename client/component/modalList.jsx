
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalEffect = this.modalEffect.bind(this);
  }

  modalEffect() {
    if (!this.props.modal) {
      return 'container centerModal';
      // hidden
    }
    return 'container centerModal ';
  }

  render() {
    return (
      <div className={this.modalEffect()}>
        <div className="row">
          <div className="col pt-2">
            <div className="d-flex align-items-center pl-2">
              <i className="fas fa-tasks logoSize"></i>
              <h3 className="pl-2">Hello</h3>
              <p className="pl-2" onClick={() => console.log('hello')}>edit</p>
              <input text="type" className=" w-50"></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
