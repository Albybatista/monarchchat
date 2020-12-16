import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField'

const socket = io.connect('http://localhost:3001', {
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': 'abc'
    }
})

const ChatPage = (props) => {
  

  return (
    <div>
      <div className="card">
        <form onSubmit={props.messageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <TextField
            name="name"
            onChange={props.onTextChange}
            value={state.name}
            label="Name"
            />
          </div>
          <div>
            <TextField
            name="message"
            onChange={props.onTextChange}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            />
          </div>
          <button>Send Message</button>
          <div className="render-chat">
            <h1>Chat Log</h1>
            {props.chatRender}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatPage;
