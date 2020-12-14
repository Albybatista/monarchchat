import './App.css';
import './';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
// import { Route, Switch } from 'react-router-dom';
const ENDPOINT = "http://127.0.0.1:4001";


function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  return (
    <div className="App">
      <p>hello world</p>
    </div>
  );
}

export default App;
