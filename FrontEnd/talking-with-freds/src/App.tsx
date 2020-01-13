import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainLobbyContainer from './UI/containers/MainLobby/MainLobby.container';

interface IProps{}
interface IState{
  content:any;
}

class App extends React.Component<IProps, IState>{

  constructor(props:any){
    super(props);
    this.state={
      content:<MainLobbyContainer/>
    };
  }

  public render(){
    return(
      <div className='App'>
        {this.state.content}
      </div>
    );
  }
}


export default App;
