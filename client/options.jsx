import React from 'react';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({ props: false });
    this.changeView = this.changeView.bind(this);
    this.revealSlider = this.revealSlider.bind(this);
  }

  changeView(e) {
    if (!this.state.props) {
      this.setState({ props: true });
    } else {
      this.setState({ propse: false });
    }
  }

  revealSlider(e) {
    if (!this.state.props) {
      return 'container hidden';
    }
  }

  hideHamburg() {
    if (!this.state.props) {
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
                <li><h3 className="check">Menu</h3></li>
              </ul>
            </div>
          </div>
        </div>
    </div>
    );
  }

}
