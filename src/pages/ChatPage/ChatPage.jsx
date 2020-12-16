import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField'

const socket = io.connect('http://localhost:3001', {
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': 'abc'
    }
})

function ChatPage(props) {
  // chat box functions
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
  socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
  })
  }, [state, chat])

  const onTextChange = e => {
  setState({ ...state, [e.target.name]: e.target.value })
  }
  
  const onMessageSubmit = e => {
  e.preventDefault()
  const { name, message } = state
  socket.emit('message', { name, message })
  setState({ message: '', name })
  }

  const renderChat = () => {
      return chat.map(({ name, message }, index) => (
      <div key={index}>
          <h3>
          {name}: <span>{message}</span>
          </h3>
      </div>
      ))
  }

  return (
    <div>
      <div className="card">
        <form onSubmit={props.onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <TextField
            name="name"
            onTextChange={props.onTextChange}
            value={state.name}
            label="Name"
            />
          </div>
          <div>
            <TextField
            name="message"
            onTextChange={props.onTextChange}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            />
          </div>
          <button>Send Message</button>
          <div className="render-chat">
            <h1>Chat Log</h1>
            {props.renderChat}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatPage;
