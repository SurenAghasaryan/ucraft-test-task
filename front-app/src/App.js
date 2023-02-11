import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [ws, setWs] = useState(null);
  const [messageBox, setMessageBox] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = function (event) {
      const data = {
        message: "Hello, WebSockets!",
      };
      ws.send(JSON.stringify(data));
    };

    ws.onclose = function (event) {
      console.log("WebSocket closed with code: " + event.code);
    };

    setWs(ws);
  }, []);

  function showMessage(message) {
    setMessages((prevMessages) => `${prevMessages}\n\n${message}`);
  }

  function handleSendClick() {
    if (!ws) {
      showMessage("No WebSocket connection :(");
      console.log("AAAA");
      return;
    }

    ws.send(messageBox);
    showMessage(messageBox);
    setMessageBox("");
  }

  return (
    <div>
      <h1>Real Time Messaging To Socket</h1>
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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
