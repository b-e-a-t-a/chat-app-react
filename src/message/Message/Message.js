import React from "react";
import { format } from 'date-fns';
import plLocale from 'date-fns/locale/pl';
import "./Message.css";

const formatDateTime = (timestamp) => {
  const dateTime = new Date(timestamp);
  const formattedDate = format(dateTime, 'eee dd.MM.yyyy', {locale: plLocale});
  const formatTime = format(dateTime, 'kk:mm');
  return `${formattedDate} o ${formatTime}`;
}

function Message({ message }) {
  return (
    <div className="message">
      <div className="message--header">
        <span className="message--user">{message.user}{" "}</span>
        <span className="message--time">{formatDateTime(message.datetime)}</span>
      </div>
      <div className="message--content">{message.content}</div>
    </div>
  );
}

export default Message;