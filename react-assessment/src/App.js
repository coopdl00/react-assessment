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
    this.setState(newState)
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

  handlePost = async (e) => {
    e.preventDefault()
    let formName = document.querySelector('#subject').value
    let formMessage = document.querySelector('#body').value
    let payload = {
      name: `${formName}`,
      message: `${formMessage}`
    }
    const response = await fetch("http://cdl-messages.herokuapp.com/messages", {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const message = await response.json()
    this.setState({
      messages: [message[0], ...this.state.messages],
      composing: this.state.composing,
      editing: this.state.editing
    })
    this.toggleComposing()
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
        <ToolBar toggleComposing={this.toggleComposing}/>
        {this.state.composing ? <Composing handlePost={this.handlePost}/> : ""}
        {this.state.editing ? <Editing/> : ""}
        {this.state.messages.length > 0 ? <List handleDelete={this.handleDelete} messages={this.state.messages}/> : "Loading Emails"}
      </div>
    );
  }
}

export default App;
