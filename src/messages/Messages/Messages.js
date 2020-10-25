import React, { useEffect, useRef } from "react";
import Message from "../../message/Message/Message.js";
import "./Messages.css";

import { format } from 'date-fns';
import differenceInHours from 'date-fns/differenceInHours';
import plLocale from 'date-fns/locale/pl';

const formatDate = (timestamp) => {
  const dateTime = new Date(timestamp);
  const formattedDate = format(dateTime, 'eee dd.MM.yyyy', {locale: plLocale});
  return `${formattedDate}`;
};


function Messages({ messages })  {
  const isDateVisible = (idx) => {
    const numberOfHoursToDisplay = 12;
    const previousMessage = messages[idx - 1];
    const message = messages[idx];

    if (idx === 0) return true;

    return (
      differenceInHours(message.datetime, previousMessage.datetime) >= numberOfHoursToDisplay
    );
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="messages">
      {messages.map((message, index) => (
        <div key={message.id}>
          <div>{ isDateVisible(index) && formatDate(message.datetime) }</div>
          <Message message={message} index={index}/>
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export default Messages;
