import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { connect } from 'react-redux';
import {List} from 'semantic-ui-react';
var dotenv = require('dotenv');
// const path = require('path')
// dotenv.config({path: require('find-config')('.env')});

const URL = window.location.origin.replace(/^http/, 'ws');
console.log('url in chat', URL)

class Chat extends Component {
  state = {
    name: this.props.user.userName,
    messages: [],
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage = message => {
    this.setState(state => ({ messages: [message, ...state.messages] }))
  }

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { avatar: this.props.user.userAvatar, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <List>
          <List.Item>
            <List.Icon name='users' />
            <List.Content>{this.props.user.userName}</List.Content>
          </List.Item>
          <List.Item style={{ marginLeft: '1px'}}>
            <List.Icon name='mail' />
            <List.Content>
              <ChatInput
              ws={this.ws}
              onSubmitMessage={messageString => this.submitMessage(messageString)}
              />
            </List.Content>
          </List.Item>
          <List.Item style={{ marginTop: '14px'}}>
          {this.state.messages.map((message, index) =>
            <ChatMessage
              key={index}
              message={message.message}
              avatar={message.avatar}
            />,
          )}
          </List.Item>
          
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.auth }
}

export default connect(mapStateToProps)(Chat);
