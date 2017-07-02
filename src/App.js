import React, { Component } from 'react';
import axios from 'axios';


import styles from './style.styl'


class Phone extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    const el = this.props.text.map((el,index)=>{
      return <div className="text" key={index} >{el}</div>
    })
    return(
      <div>
        <div className="title"><p className="text">title</p></div>
        <div style={{width: '100%', height: "35px"}}></div>
        {el}
        <div className='cursor' style={{animationDuration: '3s', display: this.props.can}}>
          <p>время 10:30</p>
        </div>
        <div className='cursor' style={{animationDuration: '1.5s', display: this.props.can}}>
          <p>место заправка</p>
        </div>
        <div className='cursor' style={{animationDuration: '1s' , display: this.props.can}}>
          <p>погода дождь</p>
        </div>
      </div>
    )
  }
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: [],
      can: 'node',
      tout: undefined
    }
  }
  componentDidUpdate(prevProps, prevState){
    var to = setTimeout(_=>{
      if(prevState.can == 'block'){
        this.setState({can: 'none'})
      }
    },3000)

  }
  addText(e){

    if( e && e.target.scrollTop + 520 >= e.target.scrollHeight && this.state.tout == undefined ){
      this.setState({can:'block',
      tout: setTimeout( _=>{
        axios.get("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1").then(data=>{
          if(data.data[0]){
            //alert('add')
            this.setState(previousState => ({
              text: [...previousState.text, data.data[0] +  data.data[0] +  data.data[0] +  data.data[0] ],
              tout: undefined
            }))
          }
        }).catch(err=> console.error(err) )
      }, 3000)

      })

    }
  }
  componentDidMount(){
    //var objDiv = document.getElementById("iphone");
    //objDiv.scrollTop = objDiv.scrollHeight;
    for(var i in [0,1,2]){
      axios.get("https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1").then(data=>{
        if(data.data[0]){
          this.setState(previousState => ({
            text: [...previousState.text, data.data[0] +  data.data[0] +  data.data[0] +  data.data[0] ]
          }))
        }
      }).catch(err=> console.error(err) )
    }
  }

  render() {
    return (
      <div className="dv">


          <div>
                <div className="iphone" id="iphone" onScroll = {  this.addText.bind(this) }>
                <Phone text={this.state.text} can={this.state.can} />
                </div>

          </div>
       </div>
    );
  }
}
