import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import Message from "./message/Message/Message.js";
import MessageForm from "./message/Message/MessageForm.js";

import db from "./config";

import differenceInHours from 'date-fns/differenceInHours';
import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';

function App() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  };

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

    scrollToBottom();
  };

  const isDateVisible = (idx) => {
    const numberOfHoursToDisplay = 12;
    const previousMessage = messages[idx - 1];
    const message = messages[idx];

    if (idx == 0) return true;

    return (
      differenceInHours(message.datetime, previousMessage.datetime) >= numberOfHoursToDisplay
    );
  };

  const formatDate = (timestamp) => {
    const dateTime = new Date(timestamp);
    const formattedDate = format(dateTime, 'eee dd.MM.yyyy', {locale: plLocale});
    return `${formattedDate}`;
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-content">
        <div className="App-content--messages">
          {messages.map((message, index) => (
            <div key={message.id}>
              <div>{ isDateVisible(index) && formatDate(message.datetime) }</div>
              <Message message={message} index={index}/>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
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
