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
// import ChatPage from '../ChatPage/ChatPage'

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

  // const renderChat = () => {
  //   let counter = 0;
  //   let arr = chat.map(({ name, message }, index) => (
  //     <div key={index}>
  //         <h3>
  //         {name}: <span>{message}</span>
  //         </h3>
  //     </div>
  //   ))
  //   console.log(arr)
  //   return arr;
  // }
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


  return (
    <>
    <div className="parent">
      {/* <div className="one">one</div>
      <div className="two">two</div>
      <div className="three">three</div> */}
    
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>

      <Switch>
        <Route exact path='/' render={() => <><HomePage /> </>} />
        <Route exact path='/profile' render={() => <ProfilePage />} />
        {/* <Route 
          exact path='/chat' 
          render={(props) => <ChatPage 
            {...props}
            component={ChatPage} 
            onTextChange={e => onTextChange(e)} 
            onMessageSubmit={e => onMessageSubmit(e)} 
            renderChat={renderChat} />} 
        /> */}
      </Switch>

      <div className="card">
        <form onSubmit={onMessageSubmit}>
        <div className="render-chat">
            <h1>Chill Vibez</h1>
            {renderChat()}
          </div>
          

          <div className="name-field">
            <TextField
              className="nameBox"
              name="name"
              onChange={e => onTextChange(e)}
              value={state.name}
              label="Name"
            />
          </div>


          <div className="message-field">
            <TextField
              className="messageBox"
              name="message"
              onChange={e => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
              />
              <button>Send Message</button>
          </div>


        </form>
      </div>
      </div>

      <footer>
        <p>App coded in React by Tech Monarchs</p>
      </footer>
    </>
  );
}

export default App;


