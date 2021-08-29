import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.revealSlider = this.revealSlider.bind(this);
    this.hideHamburg = this.hideHamburg.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    location.hash = '#';
    this.props.updateLogout(true);
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
              <ul className="menu-list">
                <li><h6 className="check" onClick={() => this.logout()}>Logout</h6></li>
                <li><h6 className="check" onClick={() => this.props.modalUpdate()}>Change wallpaper</h6></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
