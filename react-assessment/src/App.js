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

  Edit = async (id) => {
    const response = await fetch(`http://cdl-messages.herokuapp.com/messages/${id}`)
    const message = await response.json()
    this.toggleEdit()
    let formName = document.querySelector('#subject')
    let formMessage = document.querySelector('#body')
    let formId = document.querySelector('#id')
    formName.value = message[0].name
    formMessage.value =message[0].message
    formId.innerHTML = message[0].id
  }

  toggleEdit = (event) => {
    if (this.state.editing) {
      this.setState({
        messages: this.state.messages,
        composing: this.state.composing,
        editing: false
      })
    } else if (this.state.composing && !this.state.editing) {
      this.setState({
        messages: this.state.messages,
        composing: this.state.composing,
        editing: true
      })
      this.setState({
        messages: this.state.messages,
        composing: false,
        editing: this.state.editing
      })
    } else {
      this.setState({
        messages: this.state.messages,
        composing: this.state.composing,
        editing: true
      })
    }
  }

  handleEdit = async (e, id, name, message) => {
    e.preventDefault()
    let payload = {
      id,
      name,
      message
    }
    const response = await fetch(`http://cdl-messages.herokuapp.com/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const responseMessage = await response.json()
    console.log(responseMessage)
    let filteredState = this.state.messages.filter(message => message.id !== responseMessage[0].id)
    console.log(filteredState)
    let newState = {
      messages: [...filteredState, responseMessage[0]],
      composing: this.state.composing,
      editing: this.state.editing
    }
    console.log(this.state)
    this.setState(newState)
    console.log(this.state)
    this.toggleEdit()
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">React-Assessment</h1>
        {this.state.editing ? "" : <ToolBar toggleComposing={this.toggleComposing}/>}
        {this.state.composing ? <Composing handlePost={this.handlePost}/> : ""}
        {this.state.messages.length > 0 ? this.state.editing ? <Editing handleEdit={this.handleEdit} toggleEdit={this.toggleEdit}/> : <List Edit={this.Edit} handleDelete={this.handleDelete} messages={this.state.messages}/> : "Loading Emails"}
      </div>
    );
  }
}

export default App;
