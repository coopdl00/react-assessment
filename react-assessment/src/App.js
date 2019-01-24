import React, { Component } from 'react';
import './App.css';
import List from './components/List.js'
import Editing from './components/Editing.js'
import Composing from './components/Composing.js'
import ToolBar from './components/ToolBar.js'

class App extends Component {

  state = {
    messages: [],
    composing: false,
    editing: false
  }

  componentDidMount = async() => {
    const response = await fetch('http://cdl-messages.herokuapp.com/messages')
    const messages = await response.json()
    let newState = {
      messages: [...messages],
      composing: this.state.composing,
      editing: this.state.editing
    }
    console.log(this.state)
    this.setState(newState)
    console.log(this.state)
  }

  handleDelete = async (id) => {
    const response = await fetch(`http://cdl-messages.herokuapp.com/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    let filteredState = this.state.messages.filter(e => e.id !== message[0].id)
    let newState = {
      messages: [...filteredState],
      composing: this.state.composing,
      editing: this.state.editing
    }
    this.setState(newState)
  }

  toggleComposing = () => {
    if (this.state.composing) {
      this.setState({
        messages: this.state.messages,
        composing: false,
        editing: this.state.editing
      })
    } else {
      this.setState({
        messages: this.state.messages,
        composing: true,
        editing: this.state.editing
      })
    }
  }

  render() {
    return (
      <div className="container">
        <ToolBar/>
        {this.state.composing ? <Composing/> : ""}
        {this.state.editing ? <Editing/> : ""}
        {this.state.messages.length > 0 ? <List handleDelete={this.handleDelete} messages={this.state.messages}/> : "Loading Emails"}
      </div>
    );
  }
}

export default App;
