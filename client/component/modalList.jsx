
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalEffect = this.modalEffect.bind(this);
  }

  modalEffect() {
    if (!this.props.modal) {
      return 'hidden';
    }
    return 'container centerModal ';
  }

  render() {
    return (
      <div className={this.modalEffect()}>
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    );
  }
}
