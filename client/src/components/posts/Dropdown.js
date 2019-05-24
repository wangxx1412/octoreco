import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { FaAngleDown } from "react-icons/fa";

class CustomToggle extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
  
      this.props.onClick(e);
    }
  
    render() {
      return (
        <div onClick={this.handleClick}>
          {this.props.children}
        </div>
      );
    }
  }
  
export default function DropdownAngle(props){
      return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <IconContext.Provider value={{size:"1.5em", color:"black"}}>
          <FaAngleDown />
          </IconContext.Provider>
        </Dropdown.Toggle> 
        <Dropdown.Menu >
          {props.children}
        </Dropdown.Menu>
      </Dropdown>
      )
}
