import React, { Component } from 'react';
import style from './Navbar.module.css';


export default class Navbar extends Component {
  render() {
    return (
      <nav className={style.nav}>
         <div className={style.search__box}>
            <input 
               type="text" 
               className={style.input}
               placeholder='search here...'/>
            <button className=''> search</button>
         </div>
      </nav>
    )
  }
}
