import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.revealSlider = this.revealSlider.bind(this);
    this.hideHamburg = this.hideHamburg.bind(this);
  }

  revealSlider() {
    if (!this.props.values && this.props.class === '') {
      return 'container hidden';
    }
    return 'container';
  }

  hideHamburg() {
    if (!this.props.values && this.props.class === '') {
      return 'fas fa-bars';
    }
    return 'fas';
  }

  render() {
    return (
    <div >
        <i className={this.hideHamburg()}></i>
        <div className={this.revealSlider()}>
          <div className="row">
            <div className="columnHamburger ">
              <ul>
                <li><h6 className="check">Change wallpaper</h6></li>
              </ul>
            </div>
          </div>
        </div>
    </div>
    );
  }

}
