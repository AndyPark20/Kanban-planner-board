import React, { useEffect, useState } from 'react';
import Activity from './activity';

const Modal = () => {

  function infoDescription() {
    if (this.state.descriptionStatus) {
      return 'pl-4';
    }
    return 'hidden';
  }

  function descriptionStatus() {
    if (this.state.descriptionStatus) {
      return 'hidden';
    }
    return 'form-control w-75';
  }

  function modalEffect() {
    if (this.state.modalClose) {
      return 'container centerModal';
    }
    if (!this.state.modalClose) {
      return 'container centerModal hidden';
    }
  }

  function descriptionInfo(e) {
    e.preventDefault();
    if (e.key === 'Enter' || e.target.className === 'btn btn-success mt-2') {
      this.setState({ finalDescription: this.state.initialDescription, descriptionStatus: true });
    }
    if (e.target.value) {
      this.setState({ button: true });
    } else {
      this.setState({ button: false });
    }
  }

  function saveBtn() {
    this.setState({ textValue: true });
  }

  function switchCardTitle() {
    if (this.state.modalStatus) {
      return 'hidden';
    }
    return 'pl-2';
  }

};

export default Modal;
