import "./styles.css";

export const ToDoItem = (props) => {
  return (
    <div className="to-do__item">
      <p className="to-do__item__label">{props.label}</p>
      <button className="to-do__item__remove-btn" onClick={props.onClick}>
        -
      </button>
      <input type="checkbox"  onClick={props.checkElem}/>
    </div>
  );
};


// import React, { Component } from 'react'

// export default class ToDoItem extends Component {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }
