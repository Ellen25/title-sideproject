import React, { Component } from 'react';
import './App.css';


class InputCompSmall extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSubtitle: "",
    }
  }
  
  updateSubtitle = (event) => {
    this.setState({
      currentSubtitle: event.target.value
    });
  }
  submitSubtitle = () => {
    this.props.submit(this.state.currentSubtitle);
  }

  render() {
    return (
      <div className="inputCompSmall">
        <input className="w3-border w3-hover-red" placeholder="Another Subtitle?" onChange={this.updateSubtitle}></input> 
        <button onClick={this.submitSubtitle}>subTITLE</button>
      </div>
    );
  }
}

export default InputCompSmall;
