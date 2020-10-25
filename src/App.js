import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import MessageForm from "./message/Message/MessageForm.js";
import Messages from "./messages/Messages/Messages.js";

import db from "./config";

function App() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.ref("/messages").on("value", (snapshot) => {
      const firebaseMessages = snapshot.val();
      const convertedMessages = Object.entries(firebaseMessages || {}).map(
        ([id, message]) => ({
          ...message,
          id
        })
      );
      setMessages(convertedMessages);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageObj = {
      user: "Beata",
      content: newMessage,
      datetime: Date.now()
    };
    if (newMessage) {
      db.ref("/messages").push(messageObj);
    }
    setNewMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-content">
        <Messages messages={messages} />
        <MessageForm
          message={newMessage}
          handleSubmit={handleSubmit}
          handleContentChange={setNewMessage}
        />
      </main>
    </div>
  );
}

export default App;
