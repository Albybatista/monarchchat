import React, { useState, useEffect } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField'
import io from 'socket.io-client'
import ReactDOM, { Route, Switch } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import ProfilePage from '../ProfilePage/ProfilePage'
import HomePage from '../HomePage/HomePage'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import ChatPage from '../ChatPage/ChatPage'

const socket = io.connect('http://localhost:3001', {
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': 'abc'
    }
})

function App() {
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
  
  // google auth stuff
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:3000/",
      data: {}
    })
  }
  
  const responseErrorGoogle = (response) => {
  }



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
    <>
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>

      <Switch>
        <Route exact path='/' render={() => <><HomePage /> </>} />
        <Route exact path='/profile' render={() => <ProfilePage />} />
        <Route 
          exact path='/chat' 
          render={(props) => <ChatPage 
            {...props}
            component={ChatPage} 
            onChange={(e) => onTextChange(e)} 
            messageSubmit={(e) => onMessageSubmit(e)} 
            chatRender={renderChat} />} 
        />
      </Switch>

      {/* <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name"
            />
          </div>
          <div>
            <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            />
          </div>
          <button>Send Message</button>
          <div className="render-chat">
            <h1>Chat Log</h1>
            {renderChat()}
          </div>
        </form>
      </div> */}

      <footer>
        &nbsp;
        <h5>App coded in <span>React</span> by <span>Tech Monarchs</span> </h5>
      </footer>
    </>
  );
}

export default App;
