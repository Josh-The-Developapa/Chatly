import React from "react";
import "./Message.css";
function Message(props) {
  return (
    <div className="message">
      <p>{`${props.user}:`}</p>
      <p>{props.message}</p>
    </div>
  );
}

export default Message;
