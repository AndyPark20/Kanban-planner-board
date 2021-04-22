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

  function modalEffect(){
    if (this.state.modalClose) {
      return 'container centerModal';
    }
    if (!this.state.modalClose) {
      return 'container centerModal hidden';
    }

};

export default Modal;
