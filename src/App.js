/*global Canvas2Image*/
import React, { Component } from 'react';
import './App.css';
import InputComp from './InputComp.js';
import InputCompSmall from './InputCompSmall.js';
import Draggable, {DraggableCore} from 'react-draggable';
import { Unsplashed } from 'react-unsplash-container';
import html2canvas from 'html2canvas';
// import canvas2image from 'canvas2image';
const IMGURL= [
  'http://images.unsplash.com/photo-1530286910461-6a1960d1e83a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1541321973927-df8e83c34e57?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1494894194458-0174142560c0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1523481714102-f539df79c744?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1494255177615-8af17149db84?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1504951856750-1bfd1ac907a5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1551643556-0e32e30fc8e9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1483638954446-32224ed4d0d9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1520466657642-e322d9d2d5be?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1494554883842-008adae6a9bf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1551643577-371f44141d4a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1492127778108-a6cef62534f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1511892549826-a48122d9b258?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1523481714102-f539df79c744?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1550614412-40be4484c638?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1528688636434-e8f5f163a05e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1456964513482-f21a68af77ee?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
  'https://images.unsplash.com/photo-1501556424050-d4816356b73e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9'
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      words: [],
      subtitles:[],
      currentImg: IMGURL[Math.floor(Math.random() * IMGURL.length)],
    };
    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();
  }


  addWord = (newWord) => {
    let newWords = this.state.words.concat(newWord);
    this.setState({
      words: newWords  
    })
  }

  showWords = () =>{
    let paragraphs = this.state.words.map((word) => {
        return <Draggable><div className="box"> <p id="word">{word}</p> </div></Draggable>
    });
    return paragraphs
    
    }

  addSubtitle = (newSubtitle) => {
    let newSubtitles = this.state.subtitles.concat(newSubtitle);
    this.setState({
       subtitles: newSubtitles
      })
    }

  showSubtitles = () =>{
    let paragraphs1 = this.state.subtitles.map((subtitle) => {
        return <Draggable><div className="box2"> <p id="subtitle">{subtitle}</p> </div></Draggable>
    });
    return paragraphs1
      
      }

  takeScreenshot = () => {
    // console.log(this.containerRef.current.getContext('2d'));
    const result = html2canvas(this.containerRef.current, {
      allowTaint: false,
      useCORS: true,
      // canvas: this.canvasRef.current,
      // width: ,
      // height: 100,
    }).then(function(canvas) {
      // console.log(canvas, canvas.width);
      Canvas2Image.saveAsJPEG(canvas);
      // document.body.appendChild(canvas);
    });
    }

  


  render() {
    return (
      <div className="App">

        {/* <canvas ref={this.canvasRef} width="100px" height="100px"></canvas> */}

        <div className="rightPart">
          <InputComp submit={this.addWord}></InputComp>
          <InputCompSmall submit={this.addSubtitle}></InputCompSmall>

          <h3>Drag and Drop Your Titles!</h3>

          <div className="container" ref={this.containerRef}>
            {/* <Unsplashed keywords={['art', 'design','fashion']} style={{ width: "100vh", height: "70vh" }}></Unsplashed> */}
            <img src={this.state.currentImg}></img>
            
            
            <div className="display">
              {this.showWords()}
              {this.showSubtitles()}
             </div>
          </div>

          <button onClick={this.takeScreenshot}>Take A Screenshot</button>

         
         

      
        </div>


      </div>
    );
  }
}

export default App;
