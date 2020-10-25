import React from "react";
import { format } from 'date-fns';
import "./Message.css";

const formatTime = (timestamp) => {
  const dateTime = new Date(timestamp);
  const formatTime = format(dateTime, 'kk:mm');
  return `godz. ${formatTime}`;
}

function Message({ message }) {
  return (
    <div className="message">
      <div className="message--header">
        <span className="message--user">{message.user}{" "}</span>
        <span className="message--time">{formatTime(message.datetime)}</span>
      </div>
      <div className="message--content">{message.content}</div>
    </div>
  );
}

export default Message;