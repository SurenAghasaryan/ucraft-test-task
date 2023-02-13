import "./App.css";

import React, { useState, useEffect } from "react";
import { post } from "axios";

function App() {
  // const [ws, setWs] = useState(null);
  const [messageBox, setMessageBox] = useState("");
  const [messages, setMessages] = useState("");
  const [apiState, setApiState] = useState(4001);

  // WS Connection
  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:5000");

  //   ws.onopen = function (event) {
  //     const data = {
  //       message: "Hello, WebSockets!",
  //     };
  //     ws.send(JSON.stringify(data));
  //   };

  //   ws.onclose = function (event) {
  //     console.log("WebSocket closed with code: " + event.code);
  //   };

  //   setWs(ws);
  // }, []);

  function showMessage(message) {
    setMessages((prevMessages) => `${prevMessages}\n\n${message}`);
  }

  function handleSendClick() {
    // it is too
    // if (!ws) {
    //   showMessage("No WebSocket connection :(");
    //   return;
    // }

    // ws.send(messageBox);
    post(`http://localhost:${apiState}/messages`, { message: messageBox });
    showMessage(messageBox);
    setMessageBox("");
  }

  return (
    <div>
      <div className="header">
        <h1>Real Time Messaging To Socket</h1>
        <div className="api-select-button">
          <label>Choose an API: </label>
          <select
            name="apis"
            onClick={(e) => {
              setApiState(e.target.value);
            }}
          >
            <option value="4001">api-1</option>
            <option value="4002">api-2</option>
            <option value="4003">api-3</option>
          </select>
        </div>
      </div>
      <pre className="messages">{messages}</pre>
      <input
        className="message-box"
        placeholder="Type message here"
        value={messageBox}
        onChange={(e) => setMessageBox(e.target.value)}
      />
      <button
        title="Send Message!"
        className="send-button"
        onClick={handleSendClick}
      >
        Send Message
      </button>
    </div>
  );
}

export default App;
