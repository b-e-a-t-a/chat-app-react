import React from "react";

function MessageForm({ message, handleSubmit, handleContentChange }) {
  return (
    <div className="MessageForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          className="textField"
          placeholder="Beata"
        />
        <input
          type="text"
          name="content"
          value={message}
          onChange={(event) => handleContentChange(event.target.value)}
          placeholder="Twoja wiadomość..."
          className="textField"
        />
        <input type="submit" value="Submit" className="btnSubmit"/>
      </form>
    </div>
  );
}

export default MessageForm;