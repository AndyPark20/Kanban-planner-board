import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.revealSlider = this.revealSlider.bind(this);
  }

  changeView(e) {

    this.props.click();
  }

  revealSlider(e) {
    if (!this.props.values) {
      return 'container hidden';
    }
    return 'container';
  }

  hideHamburg() {
    if (!this.props.values) {
      return 'fas fa-bars';
    }
    return 'fas';
  }

  render() {
    return (
    <div onClick={this.changeView}>
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
