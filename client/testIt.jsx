import React, {useState,useEffect} from 'react';
import { render } from 'react-dom';



const HomeEntry = () =>{

  useEffect(()=>{
    window.hash='Login'
  })


  return(
    <div>
      <h1>Hello</h1>
      <input type="button"></input>
    </div>
  )
}

export default HomeEntry;
