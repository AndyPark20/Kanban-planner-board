
import React from 'react';

export default class modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ modalVisible: false });
    this.modalEffect = this.modalEffect.bind(this);
  }

  modalEffect() {
    if (!this.state.modalVisible) {
      return 'container centerModal hidden';
    }
    return 'hidden';
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
